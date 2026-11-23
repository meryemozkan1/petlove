import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './newsOperations';

const initialState = {
  items: [],
  page: 1,
  perPage: 6,
  totalPages: 1,
  totalItems: 0,
  keyword: '',
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsPage: (state, action) => {
      state.page = action.payload;
    },
    setNewsKeyword: (state, action) => {
      state.keyword = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results || [];
        state.page = action.payload.page || 1;
        state.perPage = action.payload.perPage || 6;
        state.totalPages = action.payload.totalPages || 1;
        state.totalItems = action.payload.total || 0;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setNewsPage, setNewsKeyword } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;

