import { isClient } from "@/lib/http";

export const getLocalStorage = (name: string) => {
  if (isClient()) {
    return localStorage.getItem(name);
  }
  return null; // or any default value you want to return for server-side
};

export const setLocalStorage = (name: string, value: any) => {
  if (isClient()) {
    localStorage.setItem(name, value);
  }
};

export const removeUserInfo = () => {
  if (isClient()) {
    localStorage.removeItem("user");
  }
};

export const setUserInfo = (userInfo: any) => {
  setLocalStorage("user", JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  const userString = getLocalStorage("user");
  try {
    return JSON.parse(userString!);
  } catch (e) {
    console.error("Error parsing user info from local storage", e);
    return null;
  }
};

export const getFormattedDate = () => {
  const date = new Date();

  // Lấy 2 số cuối của năm
  const year = date.getFullYear().toString();

  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  // Lấy ngày, thêm '0' nếu ngày là số một chữ số
  const day = date.getDate().toString().padStart(2, "0");

  // Ghép các phần lại với nhau
  return `${year}-${month}-${day}`;
};

export const removeAppToken = (token: string) => {
  if (isClient()) {
    localStorage.removeItem("accessToken");
  }
};

export const setAppToken = (token: any) => {
  setLocalStorage("accessToken", token);
};

export const getAppToken = () => {
  return getLocalStorage("accessToken");
};