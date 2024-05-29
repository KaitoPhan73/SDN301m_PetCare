import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./src/routes/index";
import connectDB from "./src/config/database";
// import mongoose from "mongoose";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import { Request, Response } from "express";
import qs from "qs"; // Import qs module

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use("/", router);

connectDB();

// APP INFO
// interface Config {
//   app_id: string;
//   key1: string;
//   key2: string;
//   endpoint: string;
// }

// interface Order {
//   app_id: string;
//   app_trans_id: string;
//   app_user: string;
//   app_time: number;
//   item: string;
//   embed_data: string;
//   amount: number;
//   description: string;
//   bank_code: string;
//   mac?: string;
//   callback_url: string;
// }

// interface PostData {
//   app_id: string;
//   app_trans_id: string;
//   mac?: string;
// }

// const config: Config = {
//   app_id: "2554",
//   key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
//   key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
//   endpoint: "https://sb-openapi.zalopay.vn/v2/create",
// };

// app.post("/payment", async (req: Request, res: Response) => {
//   const embed_data = {
//     redirecturl: "https://pcrender.com",
//   };

//   const items: Record<string, unknown>[] = [{}];
//   const transID = Math.floor(Math.random() * 1000000);
//   const order: Order = {
//     app_id: config.app_id,
//     app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
//     app_user: "user123",
//     app_time: Date.now(),
//     item: JSON.stringify(items),
//     embed_data: JSON.stringify(embed_data),
//     amount: 50000,
//     description: `Lazada - Payment for the order #${transID}`,
//     bank_code: "",
//     callback_url: "https://9620-116-110-41-166.ngrok-free.app/callback",
//   };

//   const data =
//     config.app_id +
//     "|" +
//     order.app_trans_id +
//     "|" +
//     order.app_user +
//     "|" +
//     order.amount +
//     "|" +
//     order.app_time +
//     "|" +
//     order.embed_data +
//     "|" +
//     order.item;

//   order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

//   try {
//     const result = await axios.post(config.endpoint, null, { params: order });
//     return res.status(200).json(result.data);
//   } catch (error) {
//     console.log();
//   }
// });

// app.post("/callback", (req: Request, res: Response) => {
//   let result: { return_code: number; return_message: string } = {
//     return_code: 0,
//     return_message: "",
//   };

//   try {
//     let dataStr: string = req.body.data;
//     let reqMac: string = req.body.mac;

//     let mac: string = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
//     console.log("mac =", mac);

//     // kiểm tra callback hợp lệ (đến từ ZaloPay server)
//     if (reqMac !== mac) {
//       // callback không hợp lệ
//       result.return_code = -1;
//       result.return_message = "mac not equal";
//     } else {
//       // thanh toán thành công
//       // merchant cập nhật trạng thái cho đơn hàng
//       let dataJson: { [key: string]: string } = JSON.parse(dataStr);
//       console.log(
//         "update order's status = success where app_trans_id =",
//         dataJson["app_trans_id"]
//       );

//       result.return_code = 1;
//       result.return_message = "success";
//     }
//   } catch (ex) {
//     const error: Error = ex as Error;
//     result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
//     result.return_message = error.message;
//   }

//   // thông báo kết quả cho ZaloPay server
//   res.json(result);
// });

// app.post("/order-status/:app_trans_id", async (req: Request, res: Response) => {
//   const app_trans_id = req.params.app_trans_id;
//   let postData: PostData = {
//     app_id: config.app_id,
//     app_trans_id: app_trans_id, // Replace with your app_trans_id
//   };

//   let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
//   postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

//   let postConfig = {
//     method: "post",
//     url: "https://sb-openapi.zalopay.vn/v2/query",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: qs.stringify(postData),
//   };

//   try {
//     const response = await axios(postConfig);
//     return res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
