// src/Pages/Dashboard/DashboardHome/User/UserOverview.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area
} from 'recharts';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';

const COLORS = ['#3b82f6', '#facc15', '#8b5cf6', '#10b981', '#ef4444'];

export default function UserOverview() {
  const { user, loading: authLoading } = useAuth();
  const api = useAxiosSecure();

  // Fetch user's applications
  const { data: apps = [], isLoading: appsLoading } = useQuery({
    queryKey: ['myApplicationsOverview', user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      api.get(`/applications/user/${user.email}`).then(res => res.data)
  });

  if (authLoading || appsLoading) {
    return <Loading />;
  }

  // Compute stats
  const total = apps.length;
  const pending = apps.filter(a => a.application_status === 'pending').length;
  const processing = apps.filter(a => a.application_status === 'processing').length;
  const completed = apps.filter(a => a.application_status === 'completed').length;
  const rejected = apps.filter(
    a => a.application_status?.toLowerCase() === 'rejected'
  ).length;

  // Chart data
  const statusData = [
    { name: 'Pending', value: pending },
    { name: 'Processing', value: processing },
    { name: 'Completed', value: completed },
    { name: 'Rejected', value: rejected }
  ];

  // Applications over time (group by date)
  const timelineData = apps.map(a => ({
    date: new Date(a.createdAt).toLocaleDateString(),
    count: 1
  }));
  const groupedTimeline = Object.values(
    timelineData.reduce((acc, cur) => {
      acc[cur.date] = acc[cur.date] || { date: cur.date, count: 0 };
      acc[cur.date].count += 1;
      return acc;
    }, {})
  );

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Overview</h1>
          <p className="text-sm sm:text-base text-gray-600 break-words">
            {user?.displayName} | {user?.email}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <StatCard label="Total" value={total} />
          <StatCard label="Pending" value={pending} />
          <StatCard label="Completed" value={completed} />
          <StatCard label="Rejected" value={rejected} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-center dark:text-black">Application Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-center dark:text-black">Applications by Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-center dark:text-black">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={groupedTimeline}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

// Small stat card
function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow text-center hover:shadow-lg transition">
      <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm sm:text-base text-gray-600">{label}</p>
    </div>
  );
}
