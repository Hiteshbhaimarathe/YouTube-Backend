// Very common code 
// can be used in multiple projects

import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadonCloudinary = async(localFilePath) => {
    try {

        if(!localFilePath){
            return null 
        }

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        // file has been uploaded successfully
        // console.log("File is uploaded on cloudinary", response.url);

        fs.unlinkSync(localFilePath)
        
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // removes the locally saved temporarry file as the upload operation got failed
    }
}


export {uploadonCloudinary}