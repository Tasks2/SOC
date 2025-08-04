// backend/routes/taskRoutes.ts
import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

export default router;
