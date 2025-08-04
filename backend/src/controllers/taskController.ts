// backend/controllers/taskController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({ orderBy: { date: 'asc' } });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, date, category } = req.body;
  if (!title || !date || !category) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const task = await prisma.task.create({
    data: {
      title,
      date: new Date(date),
      category,
    },
  });

  res.status(201).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.status(204).send();
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date, category } = req.body;

  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      title,
      date: new Date(date),
      category,
    },
  });

  res.json(task);
};
