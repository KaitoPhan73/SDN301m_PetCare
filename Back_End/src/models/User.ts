import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, default: true },
  role: { type: String, required: true },
});

const user = mongoose.model<IUser>("User", userSchema, "User");

export default user;
