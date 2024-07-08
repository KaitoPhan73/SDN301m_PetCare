import { EntityError } from "@/lib/http";
import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    console.log("error: ", error);
    // toast({
    //   title: "Lỗi",
    //   description: error?.payload?.message ?? "Lỗi không xác định",
    //   variant: "destructive",
    //   duration: duration ?? 5000,
    // });
  }
};
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const formatPriceVND = (price: any) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Không hiển thị phần thập phân
  });
};

export const formatDate = (date: any, tz: string = "Asia/Ho_Chi_Minh") => {
  if (!date) return "";

  let parsedDate;

  // Kiểm tra nếu date là một chuỗi ISO hoặc Date object
  if (typeof date === "string" || date instanceof Date) {
    parsedDate = dayjs(date).tz(tz);
  } else {
    return ""; // Trả về chuỗi rỗng nếu không phải dạng chuỗi hoặc Date
  }

  // Lấy ngày, tháng, năm, giờ, phút từ đối tượng dayjs đã phân biệt múi giờ
  const day = String(parsedDate.date()).padStart(2, "0");
  const month = String(parsedDate.month() + 1).padStart(2, "0"); // month() trả về giá trị từ 0-11
  const year = parsedDate.year();
  const hours = String(parsedDate.hour()).padStart(2, "0");
  const minutes = String(parsedDate.minute()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatTime = (minutes: any) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours > 0 ? `${hours} hour ` : ""}${remainingMinutes} minutes`;
};

// export const decodeJWT = <Payload = any>(token: string) => {
//   return jwt.decode(token) as Payload;
// };
