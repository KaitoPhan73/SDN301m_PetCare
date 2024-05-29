import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { FileArray, UploadedFile } from "express-fileupload";
import fs from "fs";


interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}
export const ImageController = {
  uploadImage: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).send("No file was uploaded.");
        return;
      }

      const filePath = req.file.path;

      const result = await cloudinary.uploader.upload(filePath, {
        upload_preset: "qa6fkqtw",
        public_id: `unique_id_${Date.now()}`,
      });

      fs.unlinkSync(filePath);

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        error,
        message: "Internal server error",
      });
      return;
    }
  },
  uploadMultipleImage: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        res.status(400).json({
          success: false,
          message: "No files were uploaded.",
        });
        return;
      }

      const files: string[] = req.files.map((file) => file.path);

      const uploadPromises = files.map(async (imgPath) => {
        const result = await cloudinary.uploader.upload(imgPath, {
          upload_preset: "qa6fkqtw",
          public_id: `unique_id_${Date.now()}`,
        });
        fs.unlinkSync(imgPath);
        return  result.secure_url
        
      });

      const uploadImages = await Promise.all(uploadPromises);

      res.status(200).json({
        data: uploadImages,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        error,
        message: "Internal server error",
      });
      return;
    }
  },
};
