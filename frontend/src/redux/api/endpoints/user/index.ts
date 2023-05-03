import { apiSlice } from '../..';
import { GetMeResponse } from './types';

export const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, void>({
      query() {
        return {
          url: '/user/me'
        };
      }
    })
  })
});

export const { useGetMeQuery } = userService;
