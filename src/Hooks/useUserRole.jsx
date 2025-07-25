// src/Hooks/useUserRole.jsx
import { useEffect, useState } from 'react';
import useAuth           from './useAuth';
import useAxiosSecure   from './useAxiosSecure';

export default function useUserRole() {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole]         = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.email) {
      setRole(null);
      setRoleLoading(false);
      return;
    }

    setRoleLoading(true);
    const emailParam = encodeURIComponent(user.email);
    axiosSecure
      .get(`/users/${emailParam}`)
      .then(res => setRole(res.data.role))
      .catch(err => {
        console.error('Error fetching role', err);
        setRole(null);
      })
      .finally(() => setRoleLoading(false));
  }, [authLoading, user?.email, axiosSecure]);

  return { role, roleLoading };
}
