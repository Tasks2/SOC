import app from './app';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import sequelize from "./config/database";
import "./models/User"; // Ensure model is loaded

// Load environment variables
config();

// const PORT = process.env.PORT || 3001;
// const prisma = new PrismaClient();

const PORT = process.env.PORT || 3307;
const prisma = new PrismaClient();

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

sequelize.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("DB connection error:", err));
  
export default server;
