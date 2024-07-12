// src/services/userService.ts
import { User } from "../models";
import { IUser } from "../types/user";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

const getUsers = async (options: any): Promise<TPagination<IUser>> => {
  return paginate(User, options);
};
const getEmployees = async (options: any): Promise<TPagination<IUser>> => {
  // // Xây dựng điều kiện để loại bỏ vai trò 'manager' và 'customer'
  const conditions = {
    role: { $in: ["admin", "employee"] },
  };

  // Kết hợp điều kiện với các options khác nếu cần thiết
  const finalOptions = {
    ...options,
    ...conditions,
  };

  // Sử dụng paginate để lấy danh sách người dùng
  const result = await paginate(User, finalOptions);

  return result;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId);
};

const getUserByUserName = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username: username });
};

const insertUser = async (data: IUser): Promise<IUser> => {
  const newUser = new User(data);
  return await newUser.save();
};

const updateUser = async (
  userId: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
};

export const findUserByUserName = async (
  userName: string
): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ username: userName });
    console.log(userName);
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
export const disableUserById = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findByIdAndUpdate(id, { status: false });
  } catch (error) {
    throw new Error("Error disable user");
  }
};
export const enableUserById = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findByIdAndUpdate(id, { status: true });
  } catch (error) {
    throw new Error("Error disable user");
  }
};
export const updatePassword = async (
  user: IUser,
  newPassword: string
): Promise<IUser | null> => {
  try {
    user.password = newPassword;
    return await user.save();
  } catch (error) {
    throw new Error("Error update pass user");
  }
};
export const userService = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  findUserByUserName,
  findUserByEmail,
  getEmployees,
  disableUserById,
  enableUserById,
  updatePassword,
};
