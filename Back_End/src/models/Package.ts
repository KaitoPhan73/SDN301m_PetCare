import mongoose, { Schema } from "mongoose";
import ServiceSchema from "./Service";

const PackageSchema: Schema = new Schema(
  {
    description: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    discount: { type: Number, default: 0 },
    services: [
      { type: mongoose.Types.ObjectId, ref: "Service", required: true },
    ],
  },
  { timestamps: true }
);

export default PackageSchema;
