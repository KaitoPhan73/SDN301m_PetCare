import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import zaloPayConfig from "../models/zaloPayConfig";

export const callbackHandler = (req: Request, res: Response) => {
  let result: { return_code: number; return_message: string } = {
    return_code: 0,
    return_message: "",
  };

  try {
    let dataStr: string = req.body.data;
    let reqMac: string = req.body.mac;

    let mac: string = CryptoJS.HmacSHA256(
      dataStr,
      zaloPayConfig.key2
    ).toString();
    console.log("mac =", mac);

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      let dataJson: { [key: string]: string } = JSON.parse(dataStr);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    const error: Error = ex as Error;
    result.return_code = 0;
    result.return_message = error.message;
  }

  res.json(result);
};
