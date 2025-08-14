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
    // Можно добавить другие методы (login, logout и т.д.)
  }),
});

export const { useSignUpMutation } = authApi;