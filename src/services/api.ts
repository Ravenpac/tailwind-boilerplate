/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
});

// adicionar outras conforme projeto
const publicRoutes = ['auth/local'];

api.interceptors.request.use(
  async config => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('@Placeholder:accessToken');
      if (
        accessToken &&
        !publicRoutes.some(route => config.url?.includes(route))
      ) {
        config.headers!.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export default api;

export async function refreshAccessToken() {
  try {
    const credentials = localStorage.getItem('@Placeholder:refreshToken');

    if (credentials && credentials !== 'undefined') {
      const { data } = await api.post('/auth/local/refresh', {
        refreshToken: credentials,
      });
      localStorage.setItem('@Placeholder:accessToken', data.jwt);
      localStorage.setItem('@Placeholder:refreshToken', data.refreshToken);
      return data?.jwt;
    }

    localStorage.clear();
    window.location.href = '/login';
  } catch (error) {
    localStorage.clear();
    window.location.href = '/login';
  }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.message === 'Network Error') {
      return Promise.reject(
        new Error('Erro de conexão! Verifique sua internet!'),
      );
    }

    if (
      error?.response?.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== 'auth/local/refresh'
    ) {
      originalRequest.retry = true;

      if (window) {
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
