import { Router } from "express";
import {
  deleteFeedBack,
  getFeedBack,
  insertFeedBack,
  updateFeedBack,
} from "../controllers/feedbackController";

const express = require("express");

const router: Router = express.Router();

router.get("/get-all", getFeedBack);

router.post("/", insertFeedBack);

router.put("/:feedbackId", updateFeedBack);

router.delete("/:feedbackId", deleteFeedBack);

export default router;
