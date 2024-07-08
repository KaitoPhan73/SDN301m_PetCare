import { Document, ObjectId } from "mongoose";

export interface IPackage extends Document {
  description: string;
  name: string;
  price: number;
  images: string;
  discount: number;
  services: ObjectId[];
  totalTime: number;
  createdAt: Date;
  updatedAt: Date;
}
