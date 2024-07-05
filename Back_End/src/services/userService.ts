// src/services/userService.ts
import { User } from "../models";
import { IUser } from "../types/user";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

const getUsers = async (options: any): Promise<TPagination<IUser>> => {
  return paginate(User, options);
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId).exec();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
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

export const findUserByUserName = async (
  userName: string
): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ username: userName });
    return user;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};
export const userService = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  findUserByUserName,
  findUserByEmail,
};
