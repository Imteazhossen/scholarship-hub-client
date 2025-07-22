import React from 'react';
import { FaGoogleScholar } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const navLinks = <>
        <li>
            <NavLink to='/' className={({ isActive }) => isActive ? 'border-b-4 border-sky-500 font-bold' : 'text-gray-500 font-bold'}>Home</NavLink>
        </li>
        <li>
            <NavLink to='/allScholarship' className={({ isActive }) => isActive ? 'border-b-4 border-sky-500 font-bold' : 'text-gray-500 font-bold'}>All Scholarship</NavLink>
        </li>
        <li>
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'border-b-4 border-sky-500 font-bold' : 'text-gray-500 font-bold'}>Dashboard</NavLink>
        </li>
    </>
    return (
        <div className="font-inter rounded-2xl navbar bg-gradient-to-r from-pink-50 from-10% via-sky-100 via-30% to-emerald-50 to-90%  w-full  md:px-7 md:mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost  -ml-5 sm:-ml-0  lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <div>
                    <FaGoogleScholar className='-ml-4 sm:-ml-0  font-extrabold' size={30} />
                </div>
                <a className="-ml-4 sm:-ml-0  btn btn-ghost text-sm md:text-xl font-extrabold">Scholarship Hub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login'  class="font-inter relative inline-flex items-center justify-center p-2 px-4 py-2 overflow-hidden font-medium text-sky-500 transition duration-300 ease-out border-2 border-sky-500 rounded-full shadow-md group">
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-sky-500 group-hover:translate-x-0 ease">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="absolute flex items-center justify-center w-full h-full text-sky-500 transition-all duration-300 transform group-hover:translate-x-full ease font-inter font-bold ">Login</span>
                    <span class="relative invisible font-inter">Login</span>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;