import { configureStore } from "@reduxjs/toolkit";
import counterSilce from "./Counter/counterSilce";
import userSlice from "./User/userSlice";

const store = configureStore({
  reducer: {
    counter: counterSilce,
    user: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
