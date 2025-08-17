// src/Pages/Overview/Overview.jsx
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../SharedComponents/Loading/Loading';

const COLORS = ['#0ea5e9','#10b981','#f59e0b','#ef4444','#a855f7'];

export default function Overview() {
  const api = useAxiosSecure();

  // Fetch applications and scholarships
  const { data: applications = [], isLoading: aLoading } = useQuery({
    queryKey: ['allApplications'],
    queryFn: () => api.get('/applications').then(r => r.data)
  });

  const { data: scholarships = [], isLoading: sLoading } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: () => api.get('/scholarships').then(r => r.data)
  });

  if (aLoading || sLoading) return <Loading />;

  // Key metrics
  const totalApplications = applications.length;
  const completedApplications = applications.filter(a => a.application_status === 'completed').length;
  const pendingApplications = applications.filter(a => a.application_status === 'pending').length;
  const totalScholarships = scholarships.length;

  // Top 5 popular scholarships
  const popularScholarships = useMemo(() => {
    return scholarships
      .map(s => ({
        name: s.name,
        applications: applications.filter(a => a.scholarshipId === s._id).length
      }))
      .sort((a,b) => b.applications - a.applications)
      .slice(0,5);
  }, [scholarships, applications]);

  // Applications by Degree
  const appsByDegree = useMemo(() => {
    const degrees = ['Bachelor', 'Masters', 'PhD'];
    return degrees.map(degree => ({
      name: degree,
      value: applications.filter(app => app.applyingDegree === degree).length
    }));
  }, [applications]);

  // Applications by Status
  const appsByStatus = useMemo(() => {
    return [
      { name: 'Completed', value: completedApplications },
      { name: 'Pending', value: pendingApplications }
    ];
  }, [completedApplications, pendingApplications]);

  // Scholarships by Category
  const scholarshipsByCategory = useMemo(() => {
    const counts = scholarships.reduce((acc, s) => {
      acc[s.scholarshipCategory] = (acc[s.scholarshipCategory] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [scholarships]);

  return (
    <section className="py-16 md:my-10 rounded-2xl bg-gradient-to-r from-gray-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Overview
        </h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-medium text-gray-500">Total Scholarships</h2>
            <p className="text-2xl font-bold text-gray-800">{totalScholarships}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-medium text-gray-500">Total Applications</h2>
            <p className="text-2xl font-bold text-gray-800">{totalApplications}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-medium text-gray-500">Completed</h2>
            <p className="text-2xl font-bold text-green-600">{completedApplications}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-medium text-gray-500">Pending</h2>
            <p className="text-2xl font-bold text-yellow-500">{pendingApplications}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Popular Scholarships */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Popular Scholarships</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularScholarships}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Applications by Degree */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Applications by Degree</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appsByDegree}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {appsByDegree.map((_,i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Applications by Status */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Applications by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
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
                  {appsByStatus.map((_,i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Scholarships by Category */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Scholarships by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scholarshipsByCategory}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
