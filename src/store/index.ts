import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./query/getProducts";
import productSlice from "./slice/products-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthAPI } from "./query/useLogin";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer, // Add the login API reducer
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(AuthAPI.middleware), // Add the login API middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
