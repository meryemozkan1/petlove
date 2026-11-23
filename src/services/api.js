import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://petlove.b.goit.study/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};

// Response Interceptor for global error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message || 'Bir hata oluştu',
    };
    return Promise.reject(customError);
  }
);

export default api;

