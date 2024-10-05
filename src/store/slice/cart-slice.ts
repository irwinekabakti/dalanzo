import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  availableQuantity: number;
}

interface CartState {
  items: CartItem[];
  status: string;
  error?: string | null;
}

const initialState: CartState = {
  items: [],
  status: STATUS.IDLE,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + action.payload.quantity;
        existingItem.quantity = Math.min(
          newQuantity,
          existingItem.availableQuantity
        );
      } else {
        state.items.push({
          ...action.payload,
          quantity: Math.min(
            action.payload.quantity,
            action.payload.availableQuantity
          ),
        });
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.min(
          action.payload.quantity,
          item.availableQuantity
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    decreaseProductQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.availableQuantity = Math.max(
          0,
          item.availableQuantity - action.payload.quantity
        );
        item.quantity = Math.min(item.quantity, item.availableQuantity);
      }
    },
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  decreaseProductQuantity,
} = cartSlice.actions;

export default cartSlice;
