import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.config.js";
import multer from "multer";
import uploader from "../config/cloudinary.config.js";

const ProfileStorage = new CloudinaryStorage({
    cloudinary: uploader,
    params: {
        folder: 'profile-pictures',
        resource_type: 'image',
        format: ['jpg', 'jpeg', 'png'],
    }
})
export default multer({ storage: ProfileStorage })