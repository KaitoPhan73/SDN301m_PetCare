import { Router } from "express";
import { ImageController } from "../controllers/imageController";
import upload from "../middleware/multer";

const express = require("express");

const router: Router = express.Router();

router.post("/upload", upload.single('image'), ImageController.uploadImage);
router.post("/upload-multiple", upload.array("images", 10), ImageController.uploadMultipleImage);

export default router;
