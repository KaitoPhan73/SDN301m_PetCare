import express, { Router } from "express";
import {
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  insertFeedback,
  updateFeedback,
} from "../controllers/feedbackController";

const router: Router = express.Router();

router.get("/", getFeedbacks);

router.get("/:feedbackId", getFeedback);

router.post("/", insertFeedback);

router.put("/:feedbackId", updateFeedback);

router.delete("/:feedbackId", deleteFeedback);

export default router;
