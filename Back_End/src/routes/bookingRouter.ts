import {protectedRoute} from "../middleware/authMiddleware";

const express = require("express");
import { Router } from "express";
import {
  deleteBooking,
  getBooking, getBookingByTime,
  getBookings,
  insertBooking,
  updateBooking,
} from "../controllers/bookingController";

const router: Router = express.Router();

router.get("/", getBookings);

router.get("/:bookingId", getBooking);

router.post("/getByRoom", getBookingByTime)

router.post("/",protectedRoute, insertBooking);

router.delete("/:bookingId",protectedRoute, deleteBooking);

router.patch("/:bookingId",protectedRoute, updateBooking);
export default router;
