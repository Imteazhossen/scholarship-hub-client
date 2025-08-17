// src/Pages/Dashboard/DashboardHome/Admin/Analytics.jsx
import React, { useMemo } from 'react';
import { useQuery }           from '@tanstack/react-query';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';

const COLORS = ['#0ea5e9','#10b981','#f59e0b','#ef4444'];

export default function Analytics() {
  const api = useAxiosSecure();

  // 1) Fetch all scholarships & applications
  const { data: scholarships = [], isLoading: sLoading } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: () => api.get('/scholarships').then(r => r.data)
  });
  const { data: applications = [], isLoading: aLoading } = useQuery({
    queryKey: ['allApplications'],
    queryFn: () => api.get('/applications').then(r => r.data)
  });

  // 2) Compute “Scholarships by Category”
  const scholarshipsByCategory = useMemo(() => {
    const counts = scholarships.reduce((acc, s) => {
      acc[s.scholarshipCategory] = (acc[s.scholarshipCategory]||0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name,value])=>({ name, value }));
  }, [scholarships]);

  // 3) Compute “Applications by Status”
  const appsByStatus = useMemo(() => {
    const counts = applications.reduce((acc, a) => {
      const st = a.application_status || 'unknown';
      acc[st] = (acc[st]||0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name,value])=>({ name, value }));
  }, [applications]);

  // 4) Compute “Applications Over Time”
  const appsOverTime = useMemo(() => {
    const map = {};
    applications.forEach(a => {
      const m = new Date(a.createdAt)
        .toLocaleString('default',{ month:'short', year:'numeric' });
      map[m] = (map[m]||0) + 1;
    });
    return Object.entries(map)
      .map(([month,count])=>({ month, count }))
      .sort((a,b)=> new Date(a.month) - new Date(b.month));
  }, [applications]);

  // 5) Loading guard
  if (sLoading || aLoading) return <Loading></Loading>;

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Admin Dashboard Analytics
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Applications by Status */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4 dark:text-black">Applications by Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={appsByStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {appsByStatus.map((_,i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Scholarships by Category */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4 dark:text-black">Scholarships by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scholarshipsByCategory}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications Over Time */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4 dark:text-black">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
