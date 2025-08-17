// src/Pages/Dashboard/DashboardHome/User/UserDashboard.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaComment
} from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedComponents/Loading/Loading';

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth();
  const api = useAxiosSecure();

  // 1) Fetch user's applications
  const {
    data: apps = [],
    isLoading: appsLoading,
    isError: appsError
  } = useQuery({
    queryKey: ['myApplications', user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      api.get(`/applications/user/${user.email}`).then(res => res.data)
  });

  // 2) Fetch user's reviews
  const {
    data: reviews = [],
    isLoading: revLoading,
    isError: revError
  } = useQuery({
    queryKey: ['myReviews', user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      api.get(`/reviews/user/${user.email}`).then(res => res.data)
  });

  if (authLoading || appsLoading || revLoading) {
    return <Loading></Loading>;
  }

  if (appsError || revError) {
    return (
      <p className="text-center py-16 text-red-500">
        There was an error loading your dashboard.
      </p>
    );
  }

  // 3) Compute stats
  const total = apps.length;
  const pending = apps.filter(a => a.application_status === 'pending').length;
  const processing = apps.filter(a => a.application_status === 'processing').length;
  const completed = apps.filter(a => a.application_status === 'completed').length;
  const rejected = apps.filter(a => a.application_status === 'Rejected' || a.application_status === 'rejected').length;
  const reviewCount = reviews.length;

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info */}
        <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow">
          <img
            src={user.photoURL || '/default-avatar.png'}
            alt={user.displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold dark:text-black">{user.displayName}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.role && user.role !== 'user' && (
              <p className="mt-1 inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid dark:text-black grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard
            icon={<FaFileAlt size={30} className="text-sky-500" />}
            label="Total Applications"
            value={total}
          />
          <StatCard
            icon={<FaClock size={30} className="text-yellow-500" />}
            label="Pending"
            value={pending}
          />
          <StatCard
            icon={<FaClock size={30} className="text-purple-500" />}
            label="Processing"
            value={processing}
          />
          <StatCard
            icon={<FaCheckCircle size={30} className="text-emerald-500" />}
            label="Completed"
            value={completed}
          />
          <StatCard
            icon={<FaTimesCircle size={30} className="text-red-500" />}
            label="Rejected"
            value={rejected}
          />
          <StatCard
            icon={<FaComment size={30} className="text-indigo-500" />}
            label="My Reviews"
            value={reviewCount}
          />
        </div>
      </div>
    </section>
  );
}

// Small reusable stat card
function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <div className="p-3 bg-sky-50 rounded-full">{icon}</div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
}
