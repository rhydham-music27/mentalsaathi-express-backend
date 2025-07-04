// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config()
// console.log(process.env.API_KEY)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
// cloudinary.api.ping().then(console.log).catch(console.error);

export default cloudinary;
