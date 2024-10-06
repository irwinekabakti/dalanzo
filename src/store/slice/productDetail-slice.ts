import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/type";
import { getProductById } from "../asyncThunk/productDetail-thunk";
import { STATUS } from "../../utils/status";
import { RootState } from "..";

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
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<ProductProps>) => {
          state.status = STATUS.SUCCEEDED;
          state.product = action.payload;
        }
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message || "An error occurred";
      });
  },
});

const selectProductDetail = (state: RootState) => state.productDetail.product;
const selectAllProducts = (state: RootState) => state.AllProducts.products;

export const selectProductWithQuantity = createSelector(
  [selectProductDetail, selectAllProducts],
  (productDetail, allProducts) => {
    if (!productDetail) return null;

    const productFromList = allProducts.find(
      (product) => product.id === productDetail.id
    );

    return {
      ...productDetail,
      quantity: productFromList?.quantity ?? 0,
    };
  }
);

export default productDetailSlice;
