require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { folder: folder }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        resolve({
          filename: result.url,
          imageId: result.public_id,
        });
      }
    });
  });
};
