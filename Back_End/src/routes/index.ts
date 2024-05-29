import express, { Router } from "express";
import userRouter from "./userRouter";
import feedbackRouter from "./feedbackRouter";
import serviceRouter from "./serviceRouter";
import authRouter from "./authRouter";
import bookingRouter from "./bookingRouter";
import roomRouter from "./roomRouter";
import imageRouter from "./imageRouter";
import paymentRouter from "./paymentRouter";

const router: Router = express.Router();
router.use("/user", userRouter);
router.use("/feedback", feedbackRouter);
router.use("/service", serviceRouter);
router.use("/auth", authRouter);
router.use("/room", roomRouter);
router.use("/booking", bookingRouter);
router.use("/image", imageRouter);
router.use("/payment", paymentRouter);

export default router;
