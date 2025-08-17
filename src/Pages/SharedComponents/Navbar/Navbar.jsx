// src/components/Navbar.jsx
import React from 'react';
import { FaGoogleScholar } from 'react-icons/fa6';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            // Show SweetAlert2 success toast
            Swal.fire({
                icon: 'success',
                title: 'Logged out successfully',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                background: '#eff6ff',
                iconColor: '#0ea5e9',
            });
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Logout failed',
                text: error.message,
            });
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'border-b-4 border-sky-500 text-sky-600 font-bold'
                            : 'text-gray-600 hover:text-sky-500 font-bold'
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allScholarships"
                    className={({ isActive }) =>
                        isActive
                            ? 'border-b-4 border-sky-500 text-sky-600 font-bold'
                            : 'text-gray-600 hover:text-sky-500 font-bold'
                    }
                >
                    All Scholarships
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/aboutUs"
                    className={({ isActive }) =>
                        isActive
                            ? 'border-b-4 border-sky-500 text-sky-600 font-bold'
                            : 'text-gray-600 hover:text-sky-500 font-bold'
                    }
                >
                    About Us
                </NavLink>
            </li>
            {user &&
                <li>
                    <NavLink
                        to="/media"
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-4 border-sky-500 text-sky-600 font-bold'
                                : 'text-gray-600 hover:text-sky-500 font-bold'
                        }
                    >
                        Media
                    </NavLink>
                </li>
            }
            {user &&
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-4 border-sky-500 text-sky-600 font-bold'
                                : 'text-gray-600 hover:text-sky-500 font-bold'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            }

        </>
    );

    return (
        <div className="navbar bg-gradient-to-r sticky top-0 z-50 rounded-b-xl from-pink-50 via-sky-100 to-emerald-50 px-4 md:px-8 py-3 shadow-md">
            {/* Start: logo and mobile menu */}
            <div className="navbar-start">
                <div className="dropdown -ml-4 sm:-ml-0 lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
                    >
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="flex items-center space-x-2">
                    <FaGoogleScholar size={28} className="text-sky-600" />
                    <span className="text-sm sm:text-xl font-extrabold text-gray-800">
                        Scholarship Hub
                    </span>
                </Link>
            </div>

            {/* Center: desktop nav links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">{navLinks}</ul>
            </div>

            {/* End: auth controls */}
            <div className="navbar-end flex items-center space-x-4">
                {!user ? (
                    <Link to="/login">
                        <button className="btn bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 transform hover:scale-105 transition">
                            Login
                        </button>
                    </Link>
                ) : (
                    <div className="flex items-center space-x-3">
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700 font-medium">
                            {user.displayName}
                        </span>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-outline btn-sm sm:btn-md border-sky-500 text-sky-500 hover:bg-sky-100 rounded-full px-2 sm:px-4 py-1 sm:py-2 transform hover:scale-105 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
