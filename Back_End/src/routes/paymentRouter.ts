import express from "express";
import {orderStatusHandler, paymentHandler,} from "../controllers/zaloPaymentController";
import {protectedRoute} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/zalopay", protectedRoute, paymentHandler);
router.post("/order-status/:app_trans_id", protectedRoute, orderStatusHandler);

export default router;
