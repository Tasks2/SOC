import { Router } from "express";
import { applyForLeave } from "../controllers/leaveController";

const router = Router();
router.post("/apply", applyForLeave);

export default router;