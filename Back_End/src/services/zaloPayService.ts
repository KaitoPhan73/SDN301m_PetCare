import axios from "axios";
import CryptoJS from "crypto-js";
import zaloPayConfig from "../models/zaloPayConfig";
import { zaloPayOrder } from "../types/zaloPayOrder";
import { zaloPayPostData } from "../types/zaloPayPostData";

import moment from "moment";

export const createOrder = async (): Promise<any> => {
  const embed_data = {
    redirecturl: "https://pcrender.com",
  };

  const items: Record<string, unknown>[] = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order: zaloPayOrder = {
    app_id: zaloPayConfig.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "https://9620-116-110-41-166.ngrok-free.app/callback",
  };

  const data =
    zaloPayConfig.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;

  order.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

  try {
    const result = await axios.post(zaloPayConfig.endpoint, null, {
      params: order,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const checkOrderStatus = async (app_trans_id: string): Promise<any> => {
  let postData: zaloPayPostData = {
    app_id: zaloPayConfig.app_id,
    app_trans_id,
  };

  let data =
    postData.app_id + "|" + postData.app_trans_id + "|" + zaloPayConfig.key1;
  postData.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

  try {
    const response = await axios.post(
      "https://sb-openapi.zalopay.vn/v2/query",
      null,
      {
        params: postData,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
