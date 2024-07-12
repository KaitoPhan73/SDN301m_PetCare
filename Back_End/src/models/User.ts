import {Schema} from "mongoose";
const UserSchema: Schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    status: {type: Boolean, default: true},
    role: {type: String, required: true},
});

 
export default UserSchema;
