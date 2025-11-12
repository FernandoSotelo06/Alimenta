import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import fs from "fs";
import path from "path";

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

export const uploadLocalImageToCloudinary = (localFilePath, folder) => {
  return new Promise((resolve, reject) => {
    // Resuelve la ruta absoluta correctamente
    const absolutePath = path.resolve(localFilePath);

    fs.readFile(absolutePath, (err, data) => {
      if (err) return reject(err);

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

      streamifier.createReadStream(data).pipe(uploadStream);
    });
  });
};