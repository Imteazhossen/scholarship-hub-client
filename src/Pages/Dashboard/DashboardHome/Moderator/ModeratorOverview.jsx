// src/Pages/Dashboard/DashboardHome/ModeratorOverview.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUniversity,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaComment,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../SharedComponents/Loading/Loading";


export default function ModeratorOverview() {
  const api = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  // Fetch scholarships
  const {
    data: scholarships = [],
    isLoading: schLoading,
    isError: schError,
  } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: () => api.get("/scholarships").then((r) => r.data),
  });

  // Fetch applications
  const {
    data: applications = [],
    isLoading: appLoading,
    isError: appError,
  } = useQuery({
    queryKey: ["allApplications"],
    queryFn: () => api.get("/applications/all").then((r) => r.data),
  });

  // Fetch reviews
  const {
    data: reviews = [],
    isLoading: revLoading,
    isError: revError,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: () => api.get("/reviews/all").then((r) => r.data),
  });

  if (authLoading || schLoading || appLoading || revLoading) {
    return <Loading />;
  }

  if (schError || appError || revError) {
    return (
      <p className="text-center py-16 text-red-500">
        Error loading dashboard data.
      </p>
    );
  }

  // Compute stats
  const totalSch = scholarships.length;
  const totalApp = applications.length;
  const pending = applications.filter(
    (a) => a.application_status === "pending"
  ).length;
  const processing = applications.filter(
    (a) => a.application_status === "processing"
  ).length;
  const completed = applications.filter(
    (a) => a.application_status === "completed"
  ).length;
  const rejected = applications.filter(
    (a) => a.application_status === "rejected"
  ).length;
  const totalRev = reviews.length;

  // Data for charts
  const appStatusData = [
    { name: "Pending", value: pending },
    { name: "Processing", value: processing },
    { name: "Completed", value: completed },
    { name: "Rejected", value: rejected },
  ];

  const overviewData = [
    { name: "Scholarships", value: totalSch },
    { name: "Applications", value: totalApp },
    { name: "Reviews", value: totalRev },
  ];

  const COLORS = ["#FACC15", "#6366F1", "#10B981", "#EF4444"];

  return (
    <section className="py-10 rounded-2xl px-4 sm:px-6 lg:px-10 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Moderator Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-white p-6 rounded-2xl shadow">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt={user.displayName}
            className="w-20 h-20 rounded-full  object-cover mx-auto sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold dark:text-black">{user.displayName}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.role && (
              <p className="mt-2 inline-block px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid dark:text-black grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<FaUniversity size={28} className="text-indigo-500" />}
            label="Scholarships"
            value={totalSch}
          />
          <StatCard
            icon={<FaFileAlt size={28} className="text-sky-500" />}
            label="Applications"
            value={totalApp}
          />
          <StatCard
            icon={<FaComment size={28} className="text-emerald-500" />}
            label="Reviews"
            value={totalRev}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
              Applications by Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {appStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
              Overview Data
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

// Small reusable stat card
function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <div className="p-3 bg-indigo-50 rounded-full">{icon}</div>
      <div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
}
