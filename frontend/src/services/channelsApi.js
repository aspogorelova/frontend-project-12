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

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery,
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;