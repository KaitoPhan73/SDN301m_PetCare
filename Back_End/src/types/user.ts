import {Document} from "mongoose";

export enum enumsRole {
    Admin = "Admin",
    Customer = "Customer",
    Manager = "Manager",
    Staff = "Staff"
}

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    status: boolean;
    role: enumsRole;
}
