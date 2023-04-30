import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedOptions, SortBy, SortOrder } from './types';

const initialState: FeedOptions = {
  search: '',
  page: 0,
  limit: 6,
  sortby: SortBy.date,
  order: SortOrder.dsc
};

export const feedSlice = createSlice({
  initialState,
  name: 'postsSlice',
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortby = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    }
  }
});

export default feedSlice.reducer;

export const { setOrder, setLimit, setPage, setSearch, setSortBy } = feedSlice.actions;
