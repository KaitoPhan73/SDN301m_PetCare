import express, { Router } from "express";
import  userRouter from "./userRouter";
import  feedbackRouter from "./feedbackRouter";
import serviceRouter from "./serviceRouter"

const router: Router = express.Router();
router.use("/user", userRouter)
router.use("/feedback", feedbackRouter)
router.use("/service", serviceRouter)

export default router