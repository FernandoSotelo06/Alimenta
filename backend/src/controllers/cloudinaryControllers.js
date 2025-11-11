import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImageToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No se proporcionó ningún archivo."));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { width: 1200, crop: "limit" },
          { fetch_format: "auto", quality: "auto" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Error desconocido al subir."));
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
