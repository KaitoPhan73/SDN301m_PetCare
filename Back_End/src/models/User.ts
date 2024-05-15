import mongoose, { Schema, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IUser } from "../types/user";

interface IUserModel extends PaginateModel<IUser & Document> {}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  status: { type: Boolean, default: true },
  role: { type: String, required: true },
});

// Kích hoạt plugin phân trang
UserSchema.plugin(mongoosePaginate);

// Tạo model của người dùng
const User: IUserModel = mongoose.model<IUser & Document, IUserModel>(
  "User",
  UserSchema,
  "User"
);

export default User;
