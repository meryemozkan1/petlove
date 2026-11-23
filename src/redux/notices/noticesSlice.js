import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotices,
  fetchCategories,
  fetchSexList,
  fetchSpeciesList,
  fetchNoticeById,
  addFavorite,
  removeFavorite,
  fetchCities,
} from './noticesOperations';
import { login, refreshUser } from '../auth/authOperations';

const initialState = {
  items: [],
  selectedNotice: null,
  categories: [],
  sexList: [],
  speciesList: [],
  cities: [],
  page: 1,
  perPage: 6,
  totalPages: 1,
  totalItems: 0,
  filters: {
    category: '',
    species: '',
    locationId: '',
    sex: '',
    keyword: '',
    byPopularity: null,
    byPrice: null,
  },
  favorites: [],
  isLoading: false,
  error: null,
};

const extractFavoriteIds = (favList) => {
  if (!Array.isArray(favList)) return [];
  return favList.map((item) => (typeof item === 'object' && item !== null ? item._id : item));
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    setNoticesPage: (state, action) => {
      state.page = action.payload;
    },
    setNoticesFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    resetNoticesFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
    },
    clearSelectedNotice: (state) => {
      state.selectedNotice = null;
    },
    setFavorites: (state, action) => {
      state.favorites = extractFavoriteIds(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notices
      .addCase(fetchNotices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results || [];
        state.page = action.payload.page || 1;
        state.perPage = action.payload.perPage || 6;
        state.totalPages = action.payload.totalPages || 1;
        state.totalItems = action.payload.total || 0;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Sex List
      .addCase(fetchSexList.fulfilled, (state, action) => {
        state.sexList = action.payload;
      })
      // Species List
      .addCase(fetchSpeciesList.fulfilled, (state, action) => {
        state.speciesList = action.payload;
      })
      // Cities
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload || [];
      })
      // Notice by id
      .addCase(fetchNoticeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedNotice = action.payload;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Favorites toggle update
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.favorites)) {
          state.favorites = extractFavoriteIds(action.payload.favorites);
        } else if (!state.favorites.includes(action.payload.id)) {
          state.favorites.push(action.payload.id);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.favorites)) {
          state.favorites = extractFavoriteIds(action.payload.favorites);
        } else {
          state.favorites = state.favorites.filter((id) => id !== action.payload.id);
        }
      })
      // Sync favorites on user login / refresh
      .addCase(login.fulfilled, (state, action) => {
        const userFavs = action.payload.user?.noticesFavorites || action.payload.noticesFavorites;
        if (userFavs) {
          state.favorites = extractFavoriteIds(userFavs);
        }
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const userFavs = action.payload?.noticesFavorites;
        if (userFavs) {
          state.favorites = extractFavoriteIds(userFavs);
        }
      });
  },
});

export const {
  setNoticesPage,
  setNoticesFilters,
  resetNoticesFilters,
  clearSelectedNotice,
  setFavorites,
} = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;

