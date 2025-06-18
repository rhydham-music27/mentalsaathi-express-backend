import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";
import multer from "multer";

const VideoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'self-therapy-videos',
        resource_type: 'video'
    }
})
export default multer({ storage: VideoStorage })