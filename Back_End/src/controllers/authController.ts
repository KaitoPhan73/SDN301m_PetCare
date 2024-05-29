import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user";
import { userService } from "../services/userService";
import { Token } from "../utils/generateToken";

import {
  comparePassword,
  hashedPassword,
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
      comparePassword(password, user.password);

      const accessToken = await Token.generateAccessToken({
        username: user?.username,
        role: user?.role,
      });

      const refreshToken = await Token.generateRefreshToken({
        username: user?.username,
        role: user?.role,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({
        message: "Login successfully!",
        accessToken: accessToken,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
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
  },
  refreshToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const rfToken = req.cookies.refreshToken;
      const secret = process.env.REFRESH_TOKEN_SECRET;
      if (!secret) {
        throw new Error(
          "REFRESH_TOKEN_SECRET is not defined in the environment variables"
        );
      }
      if (!rfToken) {
        res.status(400).json({
          message: "Please login now",
        });
        return;
      }

      const decode = verifyToken(
        rfToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as IUser | jwt.JwtPayload;

      if (typeof decode === "object" && "username" in decode) {
        const user = (await userService.findUserByUserName(
          (decode as IUser).username
        )) as IUser;
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        const accessToken: string = await Token.generateAccessToken({
          username: user?.username,
          role: user?.role,
        });

        res.status(200).json({
          message: "Refresh token successfully",
          accessToken,
          user,
        });
        return;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
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
      verifyEmail(email);
      const user = await userService.findUserByEmail(email);
      if (user) {
        res.status(400).json({ message: "Account already exists" });
        return;
      }
      if (password !== confirmPassword) {
        res.status(400).json({
          message: "Password and ConfirmPassword do not match",
        });
        return;
      }
      if (user === null) {
        const hashPassword = await hashedPassword(password);
        const createdUser = await User.create({
          email: email.toLowerCase(),
          role: role,
          username: username,
          status: true,
          password: hashPassword,
        });

        res.status(201).json({
          message: "Sign up successfully",
          user: createdUser,
        });
      }
    } catch (error) {
      console.error("Error register:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
};
