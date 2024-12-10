import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['auth'],
    }),

    // Register mutation
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['auth'],
    }),
    getMe: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/forget-password',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['auth'],
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: credentials,
        headers: {
          Authorization: `${credentials.token}`,
        },
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
