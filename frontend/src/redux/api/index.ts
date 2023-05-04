import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customFetchBase';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post', 'Login'],
  endpoints: () => ({})
});
