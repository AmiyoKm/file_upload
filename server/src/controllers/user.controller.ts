import { Request, Response } from "express";
import UserModel, { IUser } from "../model/user.model";
import bcrypt from "bcrypt";
import {
  clearAuthCookie,
  getAccessTokenCookieOptions,
  setAuthCookie,
} from "../utils/cookies";
import jwt from "jsonwebtoken";
import { JWT_SECRET, REFRESH_JWT_SECRET } from "../constants/constants";

const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }
  // Check if user with the same email already exists
  const user = await UserModel.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({
        success: false,
        error: "User with the same email already exists",
      });
  }
  const newUser = (await UserModel.create({
    username,
    email,
    password,
  })) as IUser;
  const accessToken = newUser.createJWT();
  const refreshToken = newUser.createRefreshJWT();
  return setAuthCookie({ res, accessToken, refreshToken })
    .status(201)
    .json({ success: true, newUser, accessToken });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, error: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  // const isMatch =  user.comparePassword(password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid credentials" });
  }
  const accessToken = user.createJWT();
  const refreshToken = user.createRefreshJWT();
  return setAuthCookie({ res, accessToken, refreshToken })
    .status(200)
    .json({ success: true, user, accessToken });
};

const changePassword = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(400).json({ success: false, error: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Password matching with the old password",
      });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(400).json({ success: false, error: "User not found" });
  }
  const accessToken = updatedUser.createJWT();
  const refreshToken = updatedUser.createRefreshJWT();

  return setAuthCookie({ res, accessToken, refreshToken })
    .status(200)
    .json({ success: true, accessToken, updatedUser });
};
const logout = async (req: Request, res: Response) => {
  return clearAuthCookie(res)
    .status(200)
    .json({ success: true, message: "Logged out" });
};

const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, error: "Refresh token not found" });
  }

  const {userId} = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as {userId : string}
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid refresh token" });
  }
  const accessToken = jwt.sign({ userId: userId }, JWT_SECRET, {
    expiresIn: "30d",
  });
  const newRefreshToken = jwt.sign({ userId: userId }, REFRESH_JWT_SECRET, {
    expiresIn: "30d",
  });

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getAccessTokenCookieOptions());
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access Token Refreshed" });
};

export { register, login, changePassword, logout, refresh };
