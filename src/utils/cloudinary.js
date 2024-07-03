import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) return null;
    // upload the file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded
    // console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the local saved file as the upload failed
    return null;
  }
};

const deleteFromCloudinary = async function (url) {
  try {
    if (!url) return null;

    // Extract public ID from the URL
    const publicId = url.split('/').pop().split('.')[0];

    // Use Cloudinary's SDK to delete the image
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    // Log the response if needed
    // console.log("File deleted from Cloudinary", response);

    return response;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error while deleting from Cloudinary", error);
    return null;
  }
};


export {uploadOnCloudinary,deleteFromCloudinary}

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
