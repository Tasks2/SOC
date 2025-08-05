// backend/controllers/authController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
//import prisma from "../lib/prisma";
//import { PrismaClient } from './generated/prisma'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username, // ✅ added
      password,
      role,
      department,
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !username || !password || !role || !department) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email exists
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Check if username exists
    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken." });
    }

    // Hash password
    //const hashedPassword = await bcrypt.hash('johndoe', 10);
     const hashedPassword = await bcrypt.hash(password, 10); // Use the actual password from req.body
    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email, // ✅ included
        password: hashedPassword,
        role,
        department,
        // username:'johndoe',
        // lastName: 'Doe',
        // firstName: 'John',
        // email: 'johnexample@gmail.com',
        // password:hashedPassword,
        // role: 'USER', // or 'ADMIN' based on your logic
        // department: 'Engineering', // or any default value you want to set
      },
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed.", error });
  }
};


// controllers/authController.ts


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // For now, just return the user object (omit password)
    const { password: _, ...safeUser } = user;

    res.status(200).json(safeUser);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
