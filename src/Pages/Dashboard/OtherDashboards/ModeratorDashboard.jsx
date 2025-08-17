import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaUniversity,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaComment
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../SharedComponents/Loading/Loading';


export default function ModeratorDashboard() {
  const api = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  // 1) Fetch all scholarships
  const {
    data: scholarships = [],
    isLoading: schLoading,
    isError: schError
  } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: () => api.get('/scholarships').then(r => r.data)
  });

  // 2) Fetch all applications
  const {
    data: applications = [],
    isLoading: appLoading,
    isError: appError
  } = useQuery({
    queryKey: ['allApplications'],
    queryFn: () => api.get('/applications/all').then(r => r.data)
  });

  // 3) Fetch all reviews
  const {
    data: reviews = [],
    isLoading: revLoading,
    isError: revError
  } = useQuery({
    queryKey: ['allReviews'],
    queryFn: () => api.get('/reviews/all').then(r => r.data)
  });

  if (authLoading || schLoading || appLoading || revLoading) {
    return <Loading></Loading>;
  }

  if (schError || appError || revError) {
    return (
      <p className="text-center py-16 text-red-500">
        Error loading dashboard data.
      </p>
    );
  }

  // 4) Compute stats
  const totalSch    = scholarships.length;
  const totalApp    = applications.length;
  const pending     = applications.filter(a => a.application_status === 'pending').length;
  const processing  = applications.filter(a => a.application_status === 'processing').length;
  const completed   = applications.filter(a => a.application_status === 'completed').length;
  const rejected    = applications.filter(a => a.application_status === 'rejected').length;
  const totalRev    = reviews.length;

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Moderator Info */}
        <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow">
          <img
            src={user.photoURL || '/default-avatar.png'}
            alt={user.displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold  dark:text-black">{user.displayName}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.role && (
              <p className="mt-1 inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 dark:text-black sm:grid-cols-2 gap-6">
          <StatCard
            icon={<FaUniversity size={30} className="text-indigo-500 " />}
            label="Total Scholarships"
            value={totalSch}
          />
          <StatCard
            icon={<FaFileAlt size={30} className="text-sky-500" />}
            label="Total Applications"
            value={totalApp}
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
            icon={<FaComment size={30} className="text-indigo-700" />}
            label="Total Reviews"
            value={totalRev}
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
      <div className="p-3 bg-indigo-50 rounded-full">{icon}</div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
}
