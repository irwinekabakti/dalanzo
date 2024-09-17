import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductProps } from "../../types/type";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductProps[], void>({
      query: () => "/products",
    }),
  }),
});

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
//   endpoints: (builder) => ({
//     getAllProducts: builder.query<ProductProps[], void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         const limit = 12;
//         let allProducts: ProductProps[] = [];
//         let page = 1;
//         let hasMore = true;

//         while (hasMore) {
//           const result = await fetchWithBQ(
//             `/products?limit=${limit}&offset=${(page - 1) * limit}`
//           );
//           if (result.error) return { error: result.error };
//           const products = result.data as ProductProps[];
//           allProducts = [...allProducts, ...products];
//           hasMore = products.length === limit;
//           page++;
//         }

//         return { data: allProducts };
//       },
//     }),
//   }),
// });

export const { useGetAllProductsQuery } = productApi;
