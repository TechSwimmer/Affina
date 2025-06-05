// Import necessary modules

import multer from "multer";
import  pkg from "multer-storage-cloudinary";     // Provides Cloudinary storage engine for Multer
const {CloudinaryStorage} = pkg
import {v2 as cloudinary} from 'cloudinary';


// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})


// Set up storage engine for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'Affina',                               // Folder name in Cloudinary where files will be stored
        allowed_format:['jpg,jpeg','png', 'mp4','mov'] // Allowed file types
    }
})

// Create Multer instance with Cloudinary storage
const upload = multer({ storage });

// Export the configured upload middleware
export default upload;


