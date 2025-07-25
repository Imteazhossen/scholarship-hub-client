// src/pages/Forbidden.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 p-4">
      <FaBan className="text-8xl text-sky-500 animate-bounce mb-6" />
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Forbidden</h2>
      <p className="text-center text-gray-600 max-w-md mb-6">
        Oops! You don't have permission to view this page.<br/>
        Please contact the administrator if you believe this is an error.
      </p>
      <Link to="/">
        <button className="btn bg-sky-500 text-white px-6 py-3 rounded-full 
                           hover:bg-sky-600 transform hover:scale-105 transition">
          Go to Home
        </button>
      </Link>
    </div>
  );
}
