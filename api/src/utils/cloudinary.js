const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// configuración de cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// función para subir archivos a cloudinary
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "a solas",
    });
    return result;
  } catch (error) {
    throw new Error("Error al cargar la imagen en Cloudinary");
  }
};

module.exports = uploadImage;
