import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  users: string;
  password: number;
  fullname: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema, "User");

export = User;
