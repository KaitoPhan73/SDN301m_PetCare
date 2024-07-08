import { Document, ObjectId } from "mongoose";

export interface IRoom extends Document {
  roomNo: Number;
  createDate: Date;
  modifiedDate: Date;
  name: String;
  image: String;
  type: String;
  price: Number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
