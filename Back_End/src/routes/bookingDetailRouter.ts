const express = require("express");
import { Router } from "express";
import {
  insertBookingDetail,
  updateBookingDetail,
} from "../controllers/bookingDetailController";

const router: Router = express.Router();

router.post("/", insertBookingDetail);
router.patch("/:id", updateBookingDetail);

export default router;
