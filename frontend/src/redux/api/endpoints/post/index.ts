import { apiSlice } from '../..';
import { FeedOptions } from '../../../features/feedSlice/types';
import { FeedResponse, FeedPost } from './types';

export const postsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<FeedResponse, FeedOptions>({
      query(params) {
        return {
          url: '/posts',
          params
        };
      },
      providesTags: ['Post']
    }),
    addPost: builder.mutation<FeedPost, FormData>({
      query(body) {
        return {
          url: '/posts',
          method: 'POST',
          body
        };
      },
      transformResponse: (res: { post: FeedPost }) => res.post,
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation<void, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Post']
    }),
    updatePost: builder.mutation<FeedPost, { id: number; body: FormData }>({
      query(req) {
        return {
          url: `/posts/${req.id}`,
          method: 'PATCH',
          body: req.body
        };
      },
      transformResponse: (res: { post: FeedPost }) => res.post,
      invalidatesTags: ['Post']
    })
  })
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation
} = postsService;
