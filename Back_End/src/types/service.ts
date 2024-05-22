import { Document, ObjectId } from "mongoose";

export interface IService extends Document {
  description: string;
  name: string;
  price: number;
  images: string[];
}
