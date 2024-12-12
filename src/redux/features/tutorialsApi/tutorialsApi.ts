import { baseApi } from '../../api/baseApi';

const tutorialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all tutorials
    getAllTutorials: builder.query({
      query: (query) => ({
        url: `/tutorials?${query}`,
        method: 'GET',
      }),
      providesTags: ['tutorials'],
    }),

    // Fetch a single tutorial by ID
    getTutorialById: builder.query({
      query: (id) => ({
        url: `/tutorials/${id}`,
        method: 'GET',
      }),
      providesTags: ['tutorials'],
    }),

    // Create a new tutorial
    createTutorial: builder.mutation({
      query: (data) => ({
        url: '/tutorials',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tutorials'],
    }),

    // Update an existing tutorial
    updateTutorial: builder.mutation({
      query: ({ id, data }) => {
        console.log('data', data);
        return {
          url: `/tutorials/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['tutorials'],
    }),

    // Delete a tutorial
    deleteTutorial: builder.mutation({
      query: (id) => ({
        url: `/tutorials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tutorials'],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useGetAllTutorialsQuery,
  useGetTutorialByIdQuery,
  useCreateTutorialMutation,
  useUpdateTutorialMutation,
  useDeleteTutorialMutation,
} = tutorialsApi;
