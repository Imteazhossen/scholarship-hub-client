// src/Hooks/useAxiosSecure.jsx
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // e.g. http://localhost:5000
});

export default function useAxiosSecure() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1) REQUEST interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // Grab a fresh Firebase ID token
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2) RESPONSE interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 401) {
          // Not authenticated → force logout & redirect
          logOut().finally(() => navigate('/login'));
        } else if (status === 403) {
          navigate('/forbidden');
        }
        return Promise.reject(error);
      }
    );

    // 3) Cleanup on unmount / re‑run
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
}
