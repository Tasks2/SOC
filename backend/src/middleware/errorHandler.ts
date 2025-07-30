import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handlePrismaError = (err: any) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.[0] || 'field';
      return new AppError(`${field} already exists`, 400);
    }
    if (err.code === 'P2025') {
      return new AppError('Record not found', 404);
    }
    return new AppError(`Database error: ${err.message}`, 400);
  }
  return err;
};

const handleJWTError = (err: JsonWebTokenError | TokenExpiredError) => {
  if (err instanceof TokenExpiredError) {
    return new AppError('Token expired. Please log in again!', 401);
  }
  if (err instanceof JsonWebTokenError) {
    return new AppError('Invalid token. Please log in again!', 401);
  }
  return err;
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error 💥', {
      error: err,
      stack: err.stack,
      path: req.path,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    });
  }

  // Handle specific error types
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    return res.status(prismaError.statusCode).json({
      status: prismaError.status,
      message: prismaError.message,
    });
  }

  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      errors,
    });
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    const jwtError = handleJWTError(err);
    return res.status(jwtError.statusCode).json({
      status: jwtError.status,
      message: jwtError.message,
    });
  }

  // Handle other operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle unknown errors
  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

export { errorHandler, AppError };
