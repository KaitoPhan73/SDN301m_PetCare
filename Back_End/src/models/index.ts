import mongoose from "mongoose";
import { IUser } from "../types/user";
import UserSchema from "./User";
import { IFeedBack } from "../types/feedback";
import FeedBackSchema from "./FeedBack";
import { IService } from "../types/service";
import ServiceSchema from "./Service";

const User = mongoose.model<IUser>("User", UserSchema, "User");
const Feedback = mongoose.model<IFeedBack>(
  "FeedBack",
  FeedBackSchema,
  "FeedBack"
);
const Service = mongoose.model<IService>("Service", ServiceSchema, "Service");

export { User, Feedback, Service };
