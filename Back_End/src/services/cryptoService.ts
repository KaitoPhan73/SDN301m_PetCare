// CryptoService.ts
import CryptoJS from "crypto-js";

export const generateHmacSHA256 = (data: string, key: string): string => {
  return CryptoJS.HmacSHA256(data, key).toString();
};
