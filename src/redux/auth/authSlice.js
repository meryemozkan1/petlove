import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  refreshUser,
  updateUserProfile,
} from './authOperations';

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    phone: null,
    avatar: null,
    pets: [],
    noticesFavorites: [],
    noticesViewed: [],
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || 'Beklenmeyen bir hata oluştu';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      // Edit User Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
      })
      // Shared Matchers
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          logout.pending,
          updateUserProfile.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          logout.rejected,
          updateUserProfile.rejected
        ),
        handleRejected
      );
  },
});

export const { resetAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;

