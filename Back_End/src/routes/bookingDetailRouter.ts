import {protectedRoute} from "../middleware/authMiddleware";
import {Router} from "express";
import {insertBookingDetail, updateBookingDetail, updateStaff,} from "../controllers/bookingDetailController";

const express = require("express");

const router: Router = express.Router();

router.post("/", protectedRoute, insertBookingDetail);
router.patch("/:id", updateBookingDetail);
router.put("/:id", updateStaff);

export default router;
