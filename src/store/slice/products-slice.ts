import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";
import { getAllProducts } from "../asyncThunk/productDetail-thunk";
import { STATUS } from "../../utils/status";

interface ProductState {
  products: ProductProps[];
  currentPage: number;
  itemsPerPage: number;
  searchProducts: string;
  status: string;
  error?: string | null;
}

const initialState: ProductState = {
  products: [],
  currentPage: 1,
  itemsPerPage: 12,
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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

export const { setProducts, setCurrentPage, setSearchProducts } =
  productSlice.actions;
export default productSlice;

/*
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";

interface ProductState {
  products: ProductProps[];
  currentPage: number;
  itemsPerPage: number;
  searchProducts: string;
}

const initialState: ProductState = {
  products: [],
  currentPage: 1,
  itemsPerPage: 12,
  searchProducts: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductProps[]>) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchProducts: (state, action: PayloadAction<string>) => {
      state.searchProducts = action.payload;
    },
  },
});

export const { setProducts, setCurrentPage, setSearchProducts } =
  productSlice.actions;
export default productSlice;
*/
