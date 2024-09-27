import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";
import { getProductById } from "../asyncThunk/products-thunk";
import { STATUS } from "../../utils/status";

interface ProductDetailState {
  product: ProductProps | null;
  status: string;
  error?: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  status: STATUS.IDLE,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default productDetailSlice;

/*
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";

interface ProductDetailState {
  product: ProductProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<ProductProps>) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProductDetail, setLoading, setError } =
  productDetailSlice.actions;
export default productDetailSlice;
*/
