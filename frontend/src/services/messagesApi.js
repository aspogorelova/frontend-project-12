import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiPath } from "../routes.jsx";

const baseQuery = fetchBaseQuery({
  baseUrl: apiPath,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('jwttoken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
})

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;