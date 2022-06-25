import axios, { AxiosInstance } from 'axios';
import router from 'next/router';
import { getToken } from 'src/common/utils/token';
import { eraseCookie } from 'src/common/utils/cookies';

const $api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const $apiWithToken: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

$apiWithToken.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

$apiWithToken.interceptors.response.use((response) => {
  if (response.status === 503) router.push('/maintenance-mode');
  if (response.status === 403) {
    eraseCookie('auth');
    eraseCookie('user');
    localStorage.clear();
    window.location.replace('/');
  }
  return response;
});

export default $api;
