import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('jwttoken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    signUp: builder.mutation({
      query: user => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useSignUpMutation, useLoginMutation } = authApi
