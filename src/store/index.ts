import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productApi } from "./query/getProducts";
import productSlice from "./slice/products-slice";
import productDetailSlice from "./slice/productDetail-slice";
import cartSlice from "./slice/cart-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthAPI } from "./query/useLogin";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [AuthAPI.reducerPath]: AuthAPI.reducer,
  [productApi.reducerPath]: productApi.reducer,
  product: productSlice.reducer,
  productDetail: productDetailSlice.reducer,
  cart: cartSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  blacklist: [AuthAPI.reducerPath, productApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(productApi.middleware)
      .concat(AuthAPI.middleware),
});

// Persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
