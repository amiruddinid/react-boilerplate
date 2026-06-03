import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const requestUrl: string = error.config?.url || '';

    // Skip notification + redirect for background auth-check (userFn).
    // A 401 here simply means the user is not logged in — ProtectedRoute
    // and react-query-auth will handle the redirect via <Navigate>.
    const isAuthProfileRequest = requestUrl.includes('/auth/profile');

    if (status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath === paths.auth.login.path ||
        currentPath === paths.auth.register.path;

      if (!isAuthPage && !isAuthProfileRequest) {
        // Hard redirect only for actual authenticated-user actions
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo =
          searchParams.get('redirectTo') || currentPath;
        window.location.href = paths.auth.login.getHref(redirectTo);
      }

      // Never show a notification for 401s — they are handled by the router
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || error.message;
    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);
