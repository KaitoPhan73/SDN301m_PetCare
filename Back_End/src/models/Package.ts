import mongoose, { Schema } from "mongoose";
import ServiceSchema from "./Service";

const PackageSchema: Schema = new Schema({
  description: { type: String, require: true },
  name: { type: String, require: true },
  price: { type: Number, require: true },
  images: { type: String, require: true },
  services: [{ type: mongoose.Types.ObjectId, ref: "Service", required: true }],
});

export default PackageSchema;
