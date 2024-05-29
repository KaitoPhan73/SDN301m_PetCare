const express = require("express");
import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router: Router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/loginWithGG", AuthController.loginWithGG)

export default router;