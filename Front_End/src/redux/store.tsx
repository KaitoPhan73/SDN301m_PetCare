import { configureStore } from "@reduxjs/toolkit";
import counterSilce from "./Counter/counterSilce";
import userSlice from "./User/userSlice";
import cartSlice from "./Cart/cartSlice";
const store = configureStore({
  reducer: {
    counter: counterSilce,
    user: userSlice,
    cart: cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
