import { baseApi } from '../../api/baseApi';

const vocabulariesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all vocabularies
    getAllVocabularies: builder.query({
      query: (query) => ({
        url: `/vocabularies?${query}`,
        method: 'GET',
      }),
      providesTags: ['vocabularies'],
    }),

    // Fetch a single vocabulary by ID
    getVocabularyById: builder.query({
      query: (id) => ({
        url: `/vocabularies/${id}`,
        method: 'GET',
      }),
      providesTags: ['vocabularies'],
    }),

    // Create a new vocabulary
    createVocabulary: builder.mutation({
      query: (data) => ({
        url: '/vocabularies',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['vocabularies'],
    }),

    // Update an existing vocabulary
    updateVocabulary: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vocabularies/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['vocabularies'],
    }),

    // Delete a vocabulary
    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `/vocabularies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vocabularies'],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useGetAllVocabulariesQuery,
  useGetVocabularyByIdQuery,
  useCreateVocabularyMutation,
  useUpdateVocabularyMutation,
  useDeleteVocabularyMutation,
} = vocabulariesApi;
