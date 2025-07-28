// src/Hooks/useUserRole.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function useUserRole() {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    isLoading: queryLoading,
    isError,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const emailParam = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/users/${emailParam}`);
      return res.data.role;
    },
    enabled: !authLoading && Boolean(user?.email),
    staleTime: 5 * 60 * 1000, // keep role cached for 5 minutes
  });

  return {
    role,
    roleLoading: authLoading || queryLoading,
    hasError: isError,
  };
}
