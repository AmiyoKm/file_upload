import { Request, Response } from "express-serve-static-core"
import ImageModel from "../model/image.mode"
import { uploadCloudinary } from "../cloudinaryHelper"
import fs from "fs"
import cloudinary from "../cloudinaryConfig"
import { SortOrder } from "mongoose"

export const uploadImage = async (req: Request, res: Response) => {
    const { caption, description } = req.body;
    if (!caption || !description) {
        return res.status(400).json({ success: false, error: "Please provide caption and description" });
    }
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }
        const { url, publicId } = await uploadCloudinary(req.file.path);
        const newLyUploaded = await ImageModel.create({
            caption,
            description,
            url,
            publicId,
            uploadedBy: req.user!.userId
        });
        fs.unlinkSync(req.file.path);
        return res.status(201).json({ success: true, message: "Image uploaded", image: newLyUploaded });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};
export const fetchImages = async ( req : Request, res : Response) => {

    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 3
        const skip = (page - 1) * limit
        
        const sortBy = (req.query.sortBy as string) || "createdAt"
        const orderBy = req.query.sortOrder === 'asc' ? 1 : -1
        
        const totalImages = await ImageModel.countDocuments({ uploadedBy: req.user.userId })
        const totalPages = Math.ceil(totalImages / limit)
        
        const sortObj: { [key: string]: SortOrder } = {}
        sortObj[sortBy] = orderBy === 1 ? 'asc' : 'desc';

        
        const images = await ImageModel.find({ uploadedBy: req.user.userId })
            .sort(sortObj)
            .limit(limit)
            .skip(skip)
        
        if (images.length === 0) {
            return res.status(404).json({ success: false, error: "No images found" })
        }
        
        res.status(200).json({ success: true, currentPage: page, totalImages, totalPages, images })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false , error : "Internal server error"})
        
    }
}

export const deleteImage = async (req : Request, res : Response) => {
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id
        const {userId} = req.user
        const image = await ImageModel.findById(getCurrentIdOfImageToBeDeleted)
        if(!image){
            return res.status(404).json({success: false , error : "No image found"})
        }
        if(image.uploadedBy.toString() != userId.toString()){
            return res.status(401).json({success: false , error : "You are not authorized to delete this image"})
        }
        await cloudinary.uploader.destroy(image.publicId)
        await ImageModel.findByIdAndDelete(getCurrentIdOfImageToBeDeleted)
        res.status(200).json({success: true , message : "Image deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false , error : "Internal server error"})
    }
}