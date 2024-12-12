import { baseApi } from '../../api/baseApi';

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all lessons
    getAllLessons: builder.query({
      query: (query) => ({
        url: `/lessons?${query}`,
        method: 'GET',
      }),
      providesTags: ['lessons'],
    }),

    // Fetch all complete lessons
    getAllCompleteLessons: builder.query({
      query: (query) => ({
        url: `/lessons/complete?${query}`,
        method: 'GET',
      }),
      providesTags: ['lessons'],
    }),

    // Fetch a single lesson by ID
    getLessonById: builder.query({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'GET',
      }),
      providesTags: ['lessons'],
    }),

    // Create a new lesson
    createLesson: builder.mutation({
      query: (data) => ({
        url: '/lessons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['lessons'],
    }),

    // Complete  lesson
    completeLesson: builder.mutation({
      query: (lessonId) => ({
        url: `/lessons/${lessonId}/complete`,
        method: 'PUT',
      }),
      invalidatesTags: ['lessons'],
    }),

    // Update an existing lesson
    updateLesson: builder.mutation({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['lessons'],
    }),

    // Delete a lesson
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['lessons'],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useGetAllLessonsQuery,
  useGetAllCompleteLessonsQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useCompleteLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
