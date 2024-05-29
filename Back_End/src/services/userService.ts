// src/services/userService.ts
import User from "../models/user";
import { IUser } from "../types/user";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

const getUsers = async (options: any): Promise<TPagination<IUser>> => {
  return paginate(User, options);
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId);
};

const getUserByUserName = async (username: string): Promise<IUser | null> => {
  return User.findOne({ username: username });
};

const insertUser = async (data: IUser): Promise<IUser> => {
  const newUser = new User(data);
  return newUser.save();
};

const updateUser = async (
  userId: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(userId, { $set: data }, { new: true });
};

export const userService = {
  getUsers,
  getUserById,
  getUserByUserName,
  insertUser,
  updateUser,
};
