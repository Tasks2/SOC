import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const applyForLeave = async (req: Request, res: Response) => {
  try {
    const { userId, teamId, startDate, endDate, reason, type } = req.body;
    const leave = await prisma.leaveRequest.create({
      data: {
        userId,
        teamId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: "PENDING",
        // add type if you have a field for it
      },
    });
    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit leave request", error });
  }
};