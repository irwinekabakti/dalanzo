import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";

interface ProductState {
  products: ProductProps[];
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductState = {
  products: [],
  currentPage: 1,
  itemsPerPage: 12,
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
  },
});

export const { setProducts, setCurrentPage } = productSlice.actions;
export default productSlice;
