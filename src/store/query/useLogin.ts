import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthAPI;
