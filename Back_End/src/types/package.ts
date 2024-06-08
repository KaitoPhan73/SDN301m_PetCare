import { Document, ObjectId } from "mongoose";

export interface IPackage extends Document {
  description: string;
  name: string;
  price: number;
  images: string;
  services: ObjectId[];
}
