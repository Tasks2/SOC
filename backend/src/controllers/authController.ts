import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role, department } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !role || !department) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Create user
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password, role, department},
    });

    res.status(201).json({ message: "User registered successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed.", error });
  }
};