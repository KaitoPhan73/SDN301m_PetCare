import express, { Request, Response, Router } from "express";
import {
  getUsers,
  getUser,
  insertUser,
  updateUser,
} from "../controllers/userController";

import {
  deleteRoom,
  getRoom,
  insertRoom,
  updateRoom,
} from "../controllers/roomController";
import { deleteFeedback, getFeedback, insertFeedback, updateFeedback } from "../controllers/feedbackController";

const router: Router = express.Router();

//user api
router.get("/users", getUsers);

router.get("/user/:userId", getUser);

router.post("/user", insertUser);

router.patch("/user/:userId", updateUser);

//feedback api
router.get("/feedbacks", getFeedback);

router.post("/feedback", insertFeedback);

router.put("/feedback/:feedbackId", updateFeedback);

router.delete("/feedback/:feedbackId", deleteFeedback);

//room api
router.post("/room", insertRoom);

router.get("/rooms", getRoom);

router.patch("/room/:roomId", updateRoom);

router.delete("/room/:roomId", deleteRoom);

export default router;
