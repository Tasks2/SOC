import { Router } from "express";
import { getTeamAttendance, getTodayAttendance, markAttendance, getTodayAttendanceSummary  } from "../controllers/attendanceController";

const router = Router();

router.get("/today", getTodayAttendance);
router.get("/team", getTeamAttendance);
router.post("/mark", markAttendance);
router.get("/summary", getTodayAttendanceSummary);
export default router;
