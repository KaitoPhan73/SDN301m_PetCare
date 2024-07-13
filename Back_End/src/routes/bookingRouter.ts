import {
  isHasCustomerRight,
  protectedRoute,
} from "../middleware/authMiddleware";

const express = require("express");
import { Router } from "express";
import {
  deleteBooking,
  getBooking,
  getBookingByStaffId,
  getBookingByTime,
  getBookings,
  insertBooking,
  updateBooking,
} from "../controllers/bookingController";

const router: Router = express.Router();

router.get("/", protectedRoute, getBookings);

router.get("/:bookingId", getBooking);

router.get("/getBooking/:staffId", getBookingByStaffId);

router.post("/getByRoom", getBookingByTime);

router.post("/", protectedRoute, isHasCustomerRight, insertBooking);
router.delete("/:bookingId", protectedRoute, deleteBooking);

router.patch("/:bookingId", protectedRoute, updateBooking);
export default router;
