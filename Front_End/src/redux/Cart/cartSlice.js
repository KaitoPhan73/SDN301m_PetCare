"use client";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Load cart from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        products: [],
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      products: [],
    };
  }
};

// Save cart to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: action.payload.quantity || 1,
      });

      saveState(state);
      toast.success("Complete add to booking!");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        saveState(state); // Save state to localStorage
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        }
        saveState(state); // Save state to localStorage
      }
    },
    deleteItem: (state, action) => {
      const index = action.payload;

      if (index >= 0 && index < state.products.length) {
        state.products.splice(index, 1);
        saveState(state);
        toast.success("Complete remove from booking!");
      } else {
        toast.error("Invalid index. Please try again.");
      }
    },

    resetCart: (state) => {
      state.products = [];
      saveState(state); // Save state to localStorage
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
