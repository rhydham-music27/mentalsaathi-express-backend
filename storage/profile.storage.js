import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";

const ProfileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-pictures',
        resource_type: 'image'
    }
})
export default multer({ storage: ProfileStorage })