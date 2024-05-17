import express, { Request, Response, Router } from "express";
import { getUsers, getUser, insertUser, updateUser } from "../controllers/UserController";
import { deleteFeedBack, getFeedBack, insertFeedBack, updateFeedBack } from "../controllers/feedbackController";

const router: Router = express.Router();

//user api
router.get("/users", getUsers);

router.get("/user/:userId", getUser);

router.post("/user", insertUser);

router.put("/user/:userId", updateUser);

//feedback api
router.get("/feedbacks", getFeedBack);

router.post("/feedback", insertFeedBack);

router.put("/feedback/:feedbackId", updateFeedBack);

router.delete("/feedback/:feedbackId", deleteFeedBack);

export default router;
