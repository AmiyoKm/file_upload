import { Router } from "express";
import { deleteImage, fetchImages, uploadImage } from "../controllers/image.controller.js";
import authentication from "../middleware/authentication.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";
const imageRouter = Router();
// @ts-ignore
imageRouter.route("/").get(authentication, fetchImages).post(authentication, uploadMiddleware.single("image"), uploadImage);
// @ts-ignore
imageRouter.route("/:id").delete(authentication, deleteImage);
export default imageRouter;
