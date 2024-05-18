import { Document, ObjectId } from "mongoose";

export interface IRoom extends Document {
  roomNo: Number;
  createDate: Date;
  modifiedDate: Date;
  name: String; 
  type: String; 
  price: Number;
  status: boolean;
}
