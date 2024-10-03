import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";
import { getAllProducts } from "../asyncThunk/products-thunk";
import { STATUS } from "../../utils/status";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = STATUS.LOADING;
        state.error = action.error.message;
      });
  },
});

export const { setProducts, setSearchProducts } = productSlice.actions;
export default productSlice;
