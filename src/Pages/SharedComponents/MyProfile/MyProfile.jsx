// src/Pages/Dashboard/DashboardHome/User/MyProfile.jsx
import React from 'react';
import { FaUserCircle, FaEnvelope, FaIdBadge, FaUser, FaClock, FaCalendarAlt } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../Loading/Loading';

export default function MyProfile() {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-10 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User avatar'}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-sky-300 shadow-md"
            />
          ) : (
            <FaUserCircle className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 text-gray-300" />
          )}

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {user.displayName || 'Anonymous User'}
          </h2>

          <p className="text-gray-600 flex items-center gap-2 text-sm sm:text-base break-words">
            <FaEnvelope className="text-sky-500" /> {user.email}
          </p>

          {role && (
            <span className="inline-block px-4 sm:px-6 py-1 rounded-full bg-sky-100 text-sky-800 font-medium text-xs sm:text-sm shadow">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="bg-sky-50 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-sky-700 mb-4 flex items-center gap-2">
              <FaUser /> Profile Info
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
              <li><span className="font-medium">Name:</span> {user.displayName || 'N/A'}</li>
              <li className="break-words"><span className="font-medium">Email:</span> {user.email}</li>
              <li className="break-words"><span className="font-medium">User ID:</span> {user.uid}</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="bg-emerald-50 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
              <FaIdBadge /> Account Details
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-start gap-2 break-words">
                <FaClock className="text-emerald-500 mt-1" />
                <span>
                  <span className="font-medium">Last Login:</span> {user.metadata?.lastSignInTime || 'N/A'}
                </span>
              </li>
              <li className="flex items-start gap-2 break-words">
                <FaCalendarAlt className="text-emerald-500 mt-1" />
                <span>
                  <span className="font-medium">Account Created:</span> {user.metadata?.creationTime || 'N/A'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
