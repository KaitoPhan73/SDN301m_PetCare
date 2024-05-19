import mongoose, { Schema, Document, ObjectId} from "mongoose";
import { IRoom } from "../types/room";


const RoomSchema: Schema = new Schema(
  {
    roomNo: { type: Number, required: true },
    createDate: { type: Date, required: true, default: Date.now },
    modifiedDate: { type: Date, required: true, default: Date.now },
    name: { type: String, required: true }, 
    type: { type: String, required: true },
    price: { type: Number, required: true},
    status: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const Room = mongoose.model<IRoom>("Room", RoomSchema, "Room");

export = Room;
