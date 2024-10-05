import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";
import { getAllProducts } from "../asyncThunk/products-thunk";
import { STATUS } from "../../utils/status";

const getRandomQuantity = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface ProductState {
  products: ProductProps[];
  searchProducts: string;
  status: string;
  error?: string | null;
}

const initialState: ProductState = {
  products: [],
  searchProducts: "",
  status: STATUS.IDLE,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductProps[]>) => {
      state.products = action.payload;
    },
    setSearchProducts: (state, action: PayloadAction<string>) => {
      state.searchProducts = action.payload;
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity = Math.max(
          0,
          product.quantity - action.payload.quantity
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;

        state.products = action.payload.map((product: ProductProps) => ({
          ...product,
          quantity: getRandomQuantity(20, 100),
        }));
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setProducts, setSearchProducts, updateProductQuantity } =
  productSlice.actions;
export default productSlice;
