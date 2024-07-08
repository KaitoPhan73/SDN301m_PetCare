import express, {Router} from "express";
import {
    deleteFeedback,
    getFeedback,
    getFeedbacks,
    insertFeedback,
    updateFeedback,
} from "../controllers/feedbackController";
import {protectedRoute} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/", getFeedbacks);

router.get("/:feedbackId", getFeedback);

router.post("/", protectedRoute, insertFeedback);

router.put("/:feedbackId", protectedRoute, updateFeedback);

router.delete("/:feedbackId", protectedRoute, deleteFeedback);

export default router;
