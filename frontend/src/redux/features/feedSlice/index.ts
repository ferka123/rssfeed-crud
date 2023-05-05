import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedOptions, SortBy } from './types';

const initialState: FeedOptions = {
  search: '',
  page: 0,
  limit: 6,
  sortby: SortBy.dateDsc,
  filterdate: '',
  filtercreator: ''
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
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortby = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOptions: (state, action: PayloadAction<Partial<FeedOptions>>) => {
      Object.assign(state, action.payload);
    }
  }
});

export default feedSlice.reducer;

export const { setLimit, setPage, setSearch, setSortBy, setOptions } = feedSlice.actions;
