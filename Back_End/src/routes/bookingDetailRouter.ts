import { protectedRoute } from "../middleware/authMiddleware";
import { Router } from "express";
import {
  checkExistingBookingDetail,
  insertBookingDetail,
  updateBookingDetail,
} from "../controllers/bookingDetailController";

const express = require("express");

const router: Router = express.Router();

router.post("/", protectedRoute, insertBookingDetail);
router.patch("/:id", protectedRoute, updateBookingDetail);
router.post("/check-existing", checkExistingBookingDetail);

export default router;
