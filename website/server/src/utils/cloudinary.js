const cloudinary = require("cloudinary");
require("dotenv").config();

const { v2 } = cloudinary;

const fs = require("fs");

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log(response);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = uploadOnCloudinary;