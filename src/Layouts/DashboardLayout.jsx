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
                            className="h-6 -ml-6  w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    {/* Logo */}
                    <div className='flex'>
                        <FaGoogleScholar size={28} className="dark:text-sky-500 mt-2 sm:mt-0 sm:-ml-0 -ml-5 mr-5" />
                        <span className="text-md -ml-2 font-extrabold text-gray-800">
                            Scholarship Hub
                        </span>
                    </div>
                    <div className="flex-1" />

                    {/* Role Badge */}
                    {!roleLoading && (
                        <span className="badge badge-outline capitalize dark:text-sky-500 font-semibold">
                            {role || 'guest'}
                        </span>
                    )}
                </header>

                {/* Main Outlet */}
                <main className="px-2 my-2 md:p-6 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay" />

                <aside className="w-60 bg-white shadow-lg flex flex-col">
                    <div className="p-4 flex justify-center items-center space-x-2 border-b-2 border-sky-500">
                        <FaGoogleScholar size={28} className="dark:text-sky-500" />
                        <span className='font-bold dark:text-black'>Explore Here!</span>

                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        <ul className="menu p-4 space-y-2">
                            {/* Always visible */}
                           <li className="dark:text-black" >
                                <NavLink to="/" className={linkClasses}>
                                    <FaHome className="mr-3 dark:text-sky-500" size={20} /> Home
                                </NavLink>
                            </li>

                            {/* User Links */}
                            {!roleLoading && role === 'user' && (
                                <>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/myProfile" className={linkClasses}>
                                            <FaUser className="mr-3 dark:text-sky-500" /> My Profile
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/applications" className={linkClasses}>
                                            <FaClipboardList className="mr-3 dark:text-sky-500" /> My Applications
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/myReviews" className={linkClasses}>
                                            <FaCommentDots className="mr-3 dark:text-sky-500" /> My Reviews
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/userOverview" className={linkClasses}>
                                            <FaChartLine className="mr-3 dark:text-sky-500" />  Overview
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Moderator Links */}
                            {!roleLoading && role === 'moderator' && (
                                <>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/myProfile" className={linkClasses}>
                                            <FaUser className="mr-3 dark:text-sky-500" /> My Profile
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/manageScholarships" className={linkClasses}>
                                            <FaUniversity className="mr-3 dark:text-sky-500" /> Manage Scholarships
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/addScholarships" className={linkClasses}>
                                            <FaPlusCircle className="mr-3 dark:text-sky-500" /> Add Scholarship
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/allAppliedScholarship" className={linkClasses}>
                                            <FaClipboardList className="mr-3 dark:text-sky-500" /> All Applications
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/allReviews" className={linkClasses}>
                                            <FaCommentDots className="mr-3 dark:text-sky-500" /> All Reviews
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/moderatorOverview" className={linkClasses}>
                                            <FaChartLine className="mr-3 dark:text-sky-500" /> Overview
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Admin Links */}
                            {!roleLoading && role === 'admin' && (
                                <>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/myProfile" className={linkClasses}>
                                            <FaUser className="mr-3 dark:text-sky-500" /> Admin Profile
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/manageUsers" className={linkClasses}>
                                            <FaUsers className="mr-3 dark:text-sky-500" /> Manage Users
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/addScholarshipAdmin" className={linkClasses}>
                                            <FaUniversity className="mr-3 dark:text-sky-500" /> Add Scholarships
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/manageAppliedApplication" className={linkClasses}>
                                            <FaClipboardList className="mr-3 dark:text-sky-500" /> Manage Applied Applications
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/manageScholarshipsAdmin" className={linkClasses}>
                                            <FaUniversity className="mr-3 dark:text-sky-500" /> Manage Scholarships
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/manageReviews" className={linkClasses}>
                                            <FaCommentDots className="mr-3 dark:text-sky-500" /> Manage Reviews
                                        </NavLink>
                                    </li>
                                   <li className="dark:text-black" >
                                        <NavLink to="/dashboard/analytics" className={linkClasses}>
                                            <FaChartLine className="mr-3 dark:text-sky-500" /> Overview
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
