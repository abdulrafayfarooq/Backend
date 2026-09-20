import fs from "fs";
import { v2 } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadFileToCloudinary = async (localFilePath) => {
    try {
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found: ${localFilePath}`);
        }
        const response = await cloudinary.v2.uploader.upload(localFilePath, { folder: "my_folder" ,resource_type: "auto" });
        console.log("File uploaded to Cloudinary:", response.secure_url);
        return response.secure_url;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file after upload
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
        return null;
    }
};
        




cloudinary.v2.uploader.upload(localFilePath, { folder: "my_folder" }, (error, result) => {
    if (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    } else {
        console.log("File uploaded to Cloudinary:", result.secure_url);
        return result.secure_url;
    }
});


export { uploadFileToCloudinary };