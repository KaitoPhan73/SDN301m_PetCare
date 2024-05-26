import express from "express";
import {
  paymentHandler,
  orderStatusHandler,
} from "../controllers/zaloPaymentController";

const router = express.Router();

router.post("/zalopay", paymentHandler);
router.post("/order-status/:app_trans_id", orderStatusHandler);

export default router;
