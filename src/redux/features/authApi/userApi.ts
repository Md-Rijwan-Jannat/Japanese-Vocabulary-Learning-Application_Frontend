import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch user by ID
    getMe: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    // Fetch all users
    getAllUsers: builder.query({
      query: (query) => ({
        url: '/users?' + query,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    // Update user information
    updateUser: builder.mutation({
      query: ({ id, data }) => {
        console.log('check', id, data);
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['user'],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),

    // Update user role
    updateRole: builder.mutation({
      query: ({ id, role }) => {
        console.log('check', id, role);
        return {
          url: `/users/${id}/role`,
          method: 'PATCH',
          body: { role: role },
        };
      },
      invalidatesTags: ['user'],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateRoleMutation,
} = authApi;
