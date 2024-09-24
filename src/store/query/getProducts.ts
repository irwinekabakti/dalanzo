import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductProps } from "../../types/type";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductProps[], void>({
      query: () => "/products",
    }),
    getProductById: builder.query<ProductProps, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
