import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader } from '../../services/api';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signin', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/signout');
    clearAuthHeader();
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Token bulunamadı');
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await api.get('/users/current');
      return data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.patch('/users/current/edit', userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

