import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page = 1, limit = 6, keyword = '' } = {}, thunkAPI) => {
    try {
      const params = { page, limit };
      if (keyword.trim()) params.keyword = keyword.trim();

      const { data } = await api.get('/news', { params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

