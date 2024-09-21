import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./query/getProducts";
import productSlice from "./slice/products-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthAPI } from "./query/useLogin";
import productDetailSlice from "./slice/productDetail-slice";

export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [productApi.reducerPath]: productApi.reducer,
    product: productSlice.reducer,
    productDetail: productDetailSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(AuthAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
