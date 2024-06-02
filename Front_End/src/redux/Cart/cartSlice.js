"use client";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("action", action.payload);
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      console.log("state.products", state.products);
      // Dispatch a success toast
      toast.success("Product added to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      // Dispatch a success toast
      // toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
      // Dispatch a success toast
    },

    // toggleBrand: (state, action) => {
    //   const brand = action.payload;
    //   const isBrandChecked = state.checkedBrands.some((b) => b.id === brand.id);

    //   if (isBrandChecked) {
    //     state.checkedBrands = state.checkedBrands.filter(
    //       (b) => b.id !== brand.id
    //     );
    //   } else {
    //     state.checkedBrands.push(brand);
    //   }
    // },

    // toggleCategory: (state, action) => {
    //   const category = action.payload;
    //   const isCategoryChecked = state.checkedCategorys.some(
    //     (b) => b.id === category.id
    //   );

    //   if (isCategoryChecked) {
    //     state.checkedCategorys = state.checkedCategorys.filter(
    //       (b) => b.id !== category.id
    //     );
    //   } else {
    //     state.checkedCategorys.push(category);
    //   }
    // },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  // toggleBrand,
  // toggleCategory,
} = cartSlice.actions;
export default cartSlice.reducer;
