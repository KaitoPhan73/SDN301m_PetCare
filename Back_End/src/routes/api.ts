import express, { Request, Response, Router } from "express";
import { getUsers, getUser, insertUser, updateUser } from "../controllers/UserController";
import { deleteFeedBack, getFeedBack, insertFeedBack, updateFeedBack } from "../controllers/feedbackController";
import { deleteRoom, getRoom, insertRoom, updateRoom } from "../controllers/roomController";
import { deleteBooking, getBooking, insertBooking, updateBooking } from "../controllers/bookingController";


const router: Router = express.Router();

//user api
router.get("/users", getUsers);

router.get("/user/:userId", getUser);

router.post("/user", insertUser);

router.patch("/user/:userId", updateUser);

//feedback api
router.get("/feedbacks", getFeedBack);

router.post("/feedback", insertFeedBack);

router.patch("/feedback/:feedbackId", updateFeedBack);

router.delete("/feedback/:feedbackId", deleteFeedBack);

//room api
router.get("/rooms", getRoom);

router.post("/room", insertRoom);

router.patch("/room/:roomId", updateRoom);

router.delete("/room/:roomId", deleteRoom);

//booking
router.get("/bookings", getBooking);

router.post("/booking", insertBooking);

router.delete("/booking/:bookingId", deleteBooking);

router.patch("/booking/:bookingId", updateBooking);


export default router;
