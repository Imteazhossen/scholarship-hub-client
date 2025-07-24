// src/layouts/DashboardLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router';

import {
    FaHome,
    FaUser,
    FaClipboardList,
    FaCommentDots,
    FaUniversity,
    FaPlusCircle,
    FaUsers,
    FaChartLine
} from 'react-icons/fa';
import useUserRole from '../Hooks/useUserRole';
import { FaGoogleScholar } from 'react-icons/fa6';


export default function DashboardLayout() {
    const { role, roleLoading } = useUserRole();
    console.log(role);

    const linkClasses = ({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg transition transform 
     ${isActive ? 'bg-sky-100 text-sky-700 scale-105' : 'hover:bg-sky-50 hover:scale-105'}`;

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* PAGE CONTENT */}
            <div className="drawer-content flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-sky-100 to-emerald-50">
                {/* Top Navbar */}
                <header className="navbar bg-white shadow-md px-6">
                    {/* mobile menu button */}
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    {/* Logo */}
                    <div className='flex'>
                        <FaGoogleScholar size={28} className="text-sky-600" />
                        <span className="text-xl font-extrabold text-gray-800">
                            Scholarship Hub
                        </span>
                    </div>
                    <div className="flex-1" />

                    {/* Role Badge */}
                    {!roleLoading && (
                        <span className="badge badge-outline capitalize text-sky-600 font-semibold">
                            {role || 'guest'}
                        </span>
                    )}
                </header>

                {/* Main Outlet */}
                <main className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay" />

                <aside className="w-60 bg-white shadow-lg flex flex-col">
                    <div className="p-6 border-b">
                      <FaGoogleScholar size={28} className="text-sky-600" />
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        <ul className="menu p-4 space-y-2">
                            {/* Always visible */}
                            <li>
                                <NavLink to="/" className={linkClasses}>
                                    <FaHome className="mr-3 text-sky-600" /> Home
                                </NavLink>
                            </li>

                            {/* User Links */}
                            {!roleLoading && role === 'user' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/user/profile" className={linkClasses}>
                                            <FaUser className="mr-3 text-sky-600" /> My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/user/applications" className={linkClasses}>
                                            <FaClipboardList className="mr-3 text-sky-600" /> My Applications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/user/reviews" className={linkClasses}>
                                            <FaCommentDots className="mr-3 text-sky-600" /> My Reviews
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Moderator Links */}
                            {!roleLoading && role === 'moderator' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/mod/scholarships" className={linkClasses}>
                                            <FaUniversity className="mr-3 text-sky-600" /> Manage Scholarships
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/mod/scholarships/add" className={linkClasses}>
                                            <FaPlusCircle className="mr-3 text-sky-600" /> Add Scholarship
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/mod/applications" className={linkClasses}>
                                            <FaClipboardList className="mr-3 text-sky-600" /> All Applications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/mod/reviews" className={linkClasses}>
                                            <FaCommentDots className="mr-3 text-sky-600" /> All Reviews
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Admin Links */}
                            {!roleLoading && role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/admin/users" className={linkClasses}>
                                            <FaUsers className="mr-3 text-sky-600" /> Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/admin/scholarships" className={linkClasses}>
                                            <FaUniversity className="mr-3 text-sky-600" /> Manage Scholarships
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/admin/applications" className={linkClasses}>
                                            <FaClipboardList className="mr-3 text-sky-600" /> Manage Applications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/admin/reviews" className={linkClasses}>
                                            <FaCommentDots className="mr-3 text-sky-600" /> Manage Reviews
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/admin/analytics" className={linkClasses}>
                                            <FaChartLine className="mr-3 text-sky-600" /> Analytics
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    );
}
