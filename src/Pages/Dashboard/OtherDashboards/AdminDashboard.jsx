// src/Pages/Dashboard/OtherDashboards/AdminDashboard.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaUsers,
  FaGraduationCap,
  FaClipboardList,
  FaComments
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedComponents/Loading/Loading';

export default function AdminDashboard() {
  const api = useAxiosSecure();

  // 1) Fetch all users
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data)
  });

  // 2) Fetch all scholarships
  const {
    data: scholarships = [],
    isLoading: schLoading,
    isError: schError
  } = useQuery({
    queryKey: ['scholarships'],
    queryFn: () => api.get('/scholarships').then(res => res.data)
  });

  // 3) Fetch all applications
  const {
    data: applications = [],
    isLoading: appsLoading,
    isError: appsError
  } = useQuery({
    queryKey: ['applications'],
    queryFn: () => api.get('/applications').then(res => res.data)
  });

  // 4) Fetch all reviews
  const {
    data: reviews = [],
    isLoading: revLoading,
    isError: revError
  } = useQuery({
    queryKey: ['reviewsAll'],
    queryFn: () => api.get('/reviews').then(res => res.data)
  });

  // 5) Loading / error guard
  if (usersLoading || schLoading || appsLoading || revLoading) {
    return <Loading />;
  }
  if (usersError || schError || appsError || revError) {
    return (
      <p className="text-center py-16 text-red-500">
        There was an error loading the dashboard.
      </p>
    );
  }

  // 6) Compute stats
  const totalUsers        = users.length;
  const totalScholarships = scholarships.length;
  const totalApplications = applications.length ;
  const totalReviews      = reviews.length +1;

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard
            icon={<FaUsers size={30} className="text-sky-500" />}
            label="Total Users"
            value={totalUsers}
          />
          <StatCard
            icon={<FaGraduationCap size={30} className="text-emerald-500" />}
            label="Scholarships"
            value={totalScholarships}
          />
          <StatCard
            icon={<FaClipboardList size={30} className="text-yellow-500" />}
            label="Applications"
            value={totalApplications}
          />
          <StatCard
            icon={<FaComments size={30} className="text-purple-500" />}
            label="Reviews"
            value={totalReviews}
          />
        </div>
      </div>
    </section>
  );
}

// Reusable Stat Card component
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
