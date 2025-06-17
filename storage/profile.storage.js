import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";
import multer from "multer";

const ProfileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-pictures',
        resource_type: 'image',
        format: ['jpg', 'jpeg', 'png'],
    }
})
export default multer({ storage: ProfileStorage })