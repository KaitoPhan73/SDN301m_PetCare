import { Document, ObjectId } from "mongoose";

export interface IFeedBack extends Document {
  content: string;
  createDate: Date;
  modifiedDate: Date;
  bookingId: ObjectId; 
  userId: ObjectId; 
  status: boolean;
}
