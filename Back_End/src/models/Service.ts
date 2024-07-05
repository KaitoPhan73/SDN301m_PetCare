import { Schema } from "mongoose";

const ServiceSchema: Schema = new Schema(
  {
    description: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

export default ServiceSchema;
