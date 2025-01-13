import mongoose from "mongoose";

interface ImageDocument {
    caption: string;
    description: string;
    url: string;
    publicId: string;
    uploadedBy: mongoose.Schema.Types.ObjectId;
}

const imageSchema = new mongoose.Schema<ImageDocument>({
    caption : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : "No description provided"
    },
    url: {
        type : String,
        required : true
    },
    publicId : {
        type : String,
        required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps : true})

const ImageModel = mongoose.model("Image", imageSchema)
export default ImageModel
