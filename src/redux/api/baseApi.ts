import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined.');
}

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
