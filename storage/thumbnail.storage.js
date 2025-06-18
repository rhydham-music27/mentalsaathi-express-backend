import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";

const ThumbnailStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'thumbnail',
        resource_type: 'image'
    }
})
export default multer({ storage: ThumbnailStorage })