import { Router } from "express";
import { changePassword, login, logout, refresh, register } from "../controllers/user.controller.js";
import authentication from "../middleware/authentication.js";
const userRouter = Router();
// @ts-ignore
userRouter.route("/register").post(register);
// @ts-ignore
userRouter.route("/login").post(login);
// @ts-ignore
userRouter.route("/change-password").patch(authentication, changePassword);
// @ts-ignore
userRouter.route("/logout").get(logout);
// @ts-ignore
userRouter.route("/refresh").get(refresh);
export default userRouter;
