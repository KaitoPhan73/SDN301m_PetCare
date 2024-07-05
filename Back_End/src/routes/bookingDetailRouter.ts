const express = require("express");
import { Router } from "express";
import { insertBookingDetail } from "../controllers/bookingDetailController";

const router: Router = express.Router();

router.post("/", insertBookingDetail);

export default router;
