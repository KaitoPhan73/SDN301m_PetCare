import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    console.log("cccccc", users);
    if (users.length > 0) {
      res.status(200).json({ users, message: "Users found" });
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (user !== null) {
      res.status(200).json({ user, message: "User found" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
