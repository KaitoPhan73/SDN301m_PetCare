import { Request, Response } from "express";
import User from "../models/User";
import { paginate } from "../utils/paginationExtension";
import { IUser } from "../types/user";
import { TPagination } from "../types/pagination";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const { page: _, limit: __, ...otherQueries } = req.query;

    const options = {
      page,
      limit,
      ...otherQueries,
    };

    const result: TPagination<IUser> = await paginate(User, options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
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

export const insertUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, fullname, role } = req.body;

    const existUser = await User.findOne({ username: username });

    if (existUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // Tạo một người dùng mới
    const newUser: IUser = new User({
      username,
      password,
      fullname,
      role: role,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res
      .status(201)
      .json({ user: newUser, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const update = req.body; // Assuming your request body contains the fields to update
    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });
    if (updatedUser !== null) {
      res.status(200).json({ user: updatedUser, message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.params.userId;
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (deletedUser !== null) {
//       res.status(200).json({ message: "User deleted successfully" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
