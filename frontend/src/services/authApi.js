import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/v1' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;