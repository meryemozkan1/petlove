import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async (filters = {}, thunkAPI) => {
    try {
      const { data } = await api.get('/notices', { params: filters });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'notices/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/notices/categories');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSexList = createAsyncThunk(
  'notices/fetchSexList',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/notices/sex');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSpeciesList = createAsyncThunk(
  'notices/fetchSpeciesList',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/notices/species');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNoticeById = createAsyncThunk(
  'notices/fetchNoticeById',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/notices/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  'notices/addFavorite',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/notices/favorites/add/${id}`);
      return { id, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'notices/removeFavorite',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/notices/favorites/remove/${id}`);
      return { id, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

