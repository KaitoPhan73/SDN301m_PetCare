import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  fullname: string;
  status: boolean;
  role: string;
}
