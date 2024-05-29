import { Request, Response } from "express";
import { createOrder, checkOrderStatus } from "../services/zaloPayService";

export const paymentHandler = async (req: Request, res: Response) => {
  try {
    const result = await createOrder();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

export const orderStatusHandler = async (req: Request, res: Response) => {
  const app_trans_id = req.params.app_trans_id;
  try {
    const result = await checkOrderStatus(app_trans_id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to check order status" });
  }
};
