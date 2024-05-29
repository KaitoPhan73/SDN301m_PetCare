import mongoose, { Schema, Document, ObjectId} from "mongoose";
import { IFeedBack } from "../types/feedback";

const FeedBackSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    createDate: { type: Date, required: true, default: Date.now },
    modifiedDate: { type: Date, required: true, default: Date.now },
    bookingId: { type: mongoose.Types.ObjectId, required: true }, 
    userId: { type: mongoose.Types.ObjectId, ref: 'User',required: true }, 
    status: { type: Boolean, required: true },
  },
  { versionKey: false }
);



export default FeedBackSchema
