import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    role: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model<IUser>("User", UserSchema, "User");

export = User;
