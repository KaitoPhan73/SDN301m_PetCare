import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  status: { type: Boolean, default: true },
  role: { type: String, required: true },
});

// Tạo model của người dùng
const User = mongoose.model<IUser>("User", UserSchema, "User");

export default User;
