// src/services/userService.ts
import User from "../models/User";
import { IUser } from "../types/user";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

const getUsers = async (options: any): Promise<TPagination<IUser>> => {
  return paginate(User, options);
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId);
};

const insertUser = async (userData: IUser): Promise<IUser> => {
  const newUser = new User(userData);
  return newUser.save();
};

const updateUser = async (
  userId: string,
  update: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(userId, update, { new: true });
};

export const userService = { getUsers, getUserById, insertUser, updateUser };
