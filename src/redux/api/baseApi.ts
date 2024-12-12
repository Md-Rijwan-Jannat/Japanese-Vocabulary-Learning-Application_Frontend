import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';
import { RootState } from '../store';

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
    prepareHeaders: (headers, { getState }) => {
      // const token = Cookies.get('accessToken');
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['auth', 'user', 'lessons', 'vocabularies', 'tutorials'],
  endpoints: () => ({}),
});
