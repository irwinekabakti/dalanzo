import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductProps } from "../../types/type";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductProps[], void>({
      query: () => "products",
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
