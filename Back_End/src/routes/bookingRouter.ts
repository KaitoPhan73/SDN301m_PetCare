const express = require("express");
import { Router } from "express";
import { deleteBooking, getBooking, insertBooking, updateBooking } from "../controllers/bookingController";

const router: Router = express.Router();


router.get("/", getBooking);

router.post("/", insertBooking);

router.delete("/:bookingId", deleteBooking);

router.patch("/:bookingId", updateBooking);
export default router;