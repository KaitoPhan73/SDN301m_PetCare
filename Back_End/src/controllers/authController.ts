import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user";
import { findUserByUserName, userService } from "../services/userService";
import { Token } from "../utils/generateToken";

import {
  comparePassword,
  hashedPassword,
  sendEmail,
  verifyEmail,
  verifyToken,
} from "../services/authService";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const AuthController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res
          .status(400)
          .json({ message: "Username and password are required." });
        return;
      }
      const user: IUser | null = await userService.findUserByUserName(username);

      if (!user) {
        res.status(500).json({
          message: "This account does not exist.",
        });
        return;
      }
      const isMatched = await comparePassword(password, user.password);
      if (!isMatched) {
        res.status(403).json({ message: "Password is wrong" });
      } else {
        const accessToken = await Token.generateAccessToken({
          username: user?.username,
          role: user?.role,
          email: user?.email,
          id: user?._id,
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 5 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });

        res.status(200).json({
          message: "Login successfully!",
          accessToken: accessToken,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
  loginWithGG: async (req: Request, res: Response): Promise<void> => {
    const { email, avatar, name } = req.body;
    if (email == null || avatar == null || name == null) {
      res.status(400).json({
        message: "Failed to do something exceptional with google",
      });
    }
    const user: IUser | null = await userService.findUserByEmail(email);

    if (!user) {
      res.status(500).json({
        message: "This account does not exist.",
      });
      return;
    }
    const accessToken = await Token.generateAccessToken({
      username: user?.username,
      role: user?.role,
    });

    // const refreshToken = await Token.generateRefreshToken({
    //     username: user?.username,
    //     role: user?.role,
    // });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      accessToken: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  },
  // refreshToken: async (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  // ): Promise<void> => {
  //     try {
  //         const rfToken = req.cookies.refreshToken;
  //         const secret = process.env.REFRESH_TOKEN_SECRET;
  //         if (!secret) {
  //             throw new Error(
  //                 "REFRESH_TOKEN_SECRET is not defined in the environment variables"
  //             );
  //         }
  //         // if (!rfToken) {
  //         //     res.status(400).json({
  //         //         message: "Please login now",
  //         //     });
  //         //     return;
  //         // }
  //
  //         // const decode = verifyToken(
  //         //     rfToken,
  //         //     process.env.REFRESH_TOKEN_SECRET as string
  //         // ) as IUser | jwt.JwtPayload;
  //
  //         if (typeof decode === "object" && "username" in decode) {
  //             const user = (await userService.findUserByUserName(
  //                 (decode as IUser).username
  //             )) as IUser;
  //             if (!user) {
  //                 res.status(404).json({message: "User not found"});
  //                 return;
  //             }
  //             const accessToken: string = await Token.generateAccessToken({
  //                 username: user?.username,
  //                 role: user?.role,
  //             });
  //
  //             res.status(200).json({
  //                 message: "Refresh token successfully",
  //                 accessToken,
  //                 user,
  //             });
  //             return;
  //         }
  //     } catch (error) {
  //         console.error("Error fetching user:", error);
  //         res.status(500).json({message: "Server error"});
  //         return;
  //     }
  // },
  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("refreshToken", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });

      res.status(200).json({ message: "Logout successfully" });
      return;
    } catch (error) {
      console.error("Error logout account:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, role, email, confirmPassword } = req.body;
      console.log(req.body);
      await verifyEmail(email);
      const isExistingEmail = await userService.findUserByEmail(email);
      if (isExistingEmail) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }
      const isExistingUsername = await userService.findUserByUserName(username);
      if (isExistingUsername) {
        res.status(400).json({ message: "Username already exists" });
        return;
      }
      if (password !== confirmPassword) {
        res.status(400).json({
          message: "Password and ConfirmPassword do not match",
        });
        return;
      }
      if (!isExistingEmail && !isExistingUsername) {
        const hashPassword = await hashedPassword(password);
        const createdUser = await User.create({
          email: email.toLowerCase(),
          role: role,
          username: username,
          status: true,
          password: hashPassword,
        });

        res.status(201).json(createdUser);
      }
    } catch (error) {
      console.error("Error register:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const user = await findUserByUserName(username);
      console.log(user);
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }
      const newPassword = Math.floor(Math.random() * 10000) + 100000;
      const hashPassword = await hashedPassword(newPassword.toString());
      const updateUser = await userService.updatePassword(user, hashPassword);
      await sendEmail(user.email, newPassword.toString(), user.username);
      return res
        .status(200)
        .json({ message: "New password sent to your email!" });
    } catch (error) {
      console.error("Error forgot password:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
  updatePassword: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      console.log("username", username);
      const user = await findUserByUserName(username);
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }
      const hashPassword = await hashedPassword(password.toString());
      await userService.updatePassword(user, hashPassword);
      return res.status(200).json({ message: "Update password successfully" });
    } catch (error) {
      console.error("Error forgot password:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
};
