import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No description provided"
    },
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });
const ImageModel = mongoose.model("Image", imageSchema);
export default ImageModel;
