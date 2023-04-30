import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.BASE_URL}/api`,
    credentials: 'include'
  }),
  tagTypes: ['Post', 'Login'],
  endpoints: () => ({})
});
