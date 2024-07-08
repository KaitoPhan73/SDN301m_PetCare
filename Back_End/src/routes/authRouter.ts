import {protectedRoute} from "../middleware/authMiddleware";
import {Router} from "express";
import {AuthController} from "../controllers/authController";

const express = require("express");

const router: Router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/loginWithGG", AuthController.loginWithGG)
router.post("/forgotPassword", protectedRoute, AuthController.forgotPassword);
router.put("/updatePassword", protectedRoute, AuthController.updatePassword);

export default router;