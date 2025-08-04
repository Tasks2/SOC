import { Request, Response } from "express";
import { User } from "../models/User";
// import your User model here

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Replace with your actual DB call
    const users = await User.findAll(); // or User.find() for Mongoose
    console.log(users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};