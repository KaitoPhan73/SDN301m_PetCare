// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import {
  disableUserById,
  enableUserById,
  userService,
} from "../services/userService";
import { IUser } from "../types/user";
import { TPagination } from "../types/pagination";
import { User } from "../models";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const { page: _, limit: __, ...otherQueries } = req.query;

    const options = {
      page,
      limit,
      ...otherQueries,
      role: "Customer",
    };

    const result: TPagination<IUser> = await userService.getUsers(options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
};
export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const { page: _, limit: __, ...otherQueries } = req.query;

    const options = {
      page,
      limit,
      ...otherQueries,
    };

    const result: TPagination<IUser> = await userService.getEmployees(options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (user !== null) {
      res.status(200).json(user);
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
    const { username, password, email, role } = req.body;
    const existUser = await userService.findUserByUserName(username);

    if (existUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = {
      username,
      password,
      email,
      role,
    } as IUser;
    const createdUser = await userService.insertUser(newUser);

    res
      .status(201)
      .json({ user: createdUser, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const data = req.body.data;
    const updatedUser = await userService.updateUser(userId, data);
    if (updatedUser !== null) {
      res
        .status(200)
        .json({ user: updatedUser, message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const disableUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await disableUserById(userId);
    res.status(200).json({
      user,
      message: "User disabled successfully",
    });
  } catch (error) {
    console.error("Error disable user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const enableUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await enableUserById(userId);
    res.status(200).json({
      user,
      message: "User enable successfully",
    });
  } catch (error) {
    console.error("Error enable user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const { page: _, limit: __, ...otherQueries } = req.query;

    const options = {
      page,
      limit,
      ...otherQueries,
    };

    const result: TPagination<IUser> = await userService.getCustomer(options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
};

export const getStaffs = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.getStaff();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
};
