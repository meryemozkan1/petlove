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
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
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
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/signout');
    clearAuthHeader();
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message || 'Logout failed');
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
      let res;
      try {
        res = await api.get('/users/current/full');
      } catch {
        res = await api.get('/users/current');
      }
      return res.data;
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
      return thunkAPI.rejectWithValue(error.message || 'Update profile failed');
    }
  }
);

export const getFullUserProfile = createAsyncThunk(
  'auth/getFullUserProfile',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/users/current/full');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Get full profile failed');
    }
  }
);

export const addPet = createAsyncThunk(
  'auth/addPet',
  async (petData, thunkAPI) => {
    try {
      const { data } = await api.post('/users/current/pets/add', petData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Add pet failed');
    }
  }
);

export const removePet = createAsyncThunk(
  'auth/removePet',
  async (petId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/users/current/pets/remove/${petId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Remove pet failed');
    }
  }
);
