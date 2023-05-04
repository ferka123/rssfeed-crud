import { getCookie } from 'typescript-cookie';
import { apiSlice } from '../..';
import { LoginData, LoginResponse } from './types';

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginData>({
      query(body) {
        return {
          url: '/auth/login',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Login']
    }),
    logout: builder.mutation<LoginResponse, void>({
      query(body) {
        return {
          url: '/auth/logout',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Login']
    }),
    loginCheck: builder.query<boolean, void>({
      queryFn: () => {
        return { data: getCookie('loggedin') === 'true' };
      },
      providesTags: ['Login']
    })
  })
});

export const { useLoginCheckQuery, useLoginMutation, useLogoutMutation } = authService;
