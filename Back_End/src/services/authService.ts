const bcrypt = require("bcryptjs");
import jwt, { JwtPayload } from "jsonwebtoken";

export const comparePassword = async (
  passwordInput: string,
  passwordUser: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(passwordInput, passwordUser);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Password is not correct.");
  }
};
export const verifyToken = async (
  rfToken: string,
  variableEnvironment: string
): Promise<string | JwtPayload> => {
  try {
    const decoded = jwt.verify(rfToken, variableEnvironment);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const verifyEmail = async (email: string): Promise<boolean> => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email.toLowerCase());
  } catch (error) {
    throw new Error("Invalid email format");
  }
};

export const hashedPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Hash password error");
  }
};
