// src/Pages/Dashboard/DashboardHome/User/MyProfile.jsx
import React from 'react';

import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../Loading/Loading';

export default function MyProfile() {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (authLoading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          {user.photoURL
            ? <img
                src={user.photoURL}
                alt={user.displayName || 'User avatar'}
                className="w-24 h-24 rounded-full object-cover border-4 border-sky-200"
              />
            : <FaUserCircle className="w-24 h-24 text-gray-300" />
          }
          <h2 className="text-2xl font-bold text-gray-800">
            {user.displayName || 'Anonymous'}
          </h2>
          <p className="text-gray-600">{user.email}</p>

          {role && role !== 'user' && (
            <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-800 font-medium">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          )}

          {/* Optional extra info */}
          <div className="w-full mt-6 space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">User ID:</span> {user.uid}
            </p>
            {/* You could fetch & show created_at, last_login from your own /users/:email API here */}
          </div>
        </div>
      </div>
    </section>
  );
}
