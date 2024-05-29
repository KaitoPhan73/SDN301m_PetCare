import jwt from "jsonwebtoken"
import { IUser } from "../types/user"

export module Token {
    export const generateAccessToken = async (payload: Pick<IUser, "username"| "role" >):  Promise<string>=> {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
        }
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token as string);
                }
            });
        });
    }

    export const generateRefreshToken = async (payload: Pick<IUser, "username"| "role" >):  Promise<string>=> {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
        }
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30d' }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token as string);
                }
            });
        });
    }
}