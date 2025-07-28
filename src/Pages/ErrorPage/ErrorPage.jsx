// src/Pages/SharedComponents/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorPage({ status = 404, message = "Page not found." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md text-center animate-fade-in">
        <FaExclamationTriangle className="mx-auto text-6xl text-red-500 animate-bounce" />
        <h1 className="text-6xl font-extrabold mt-4 text-gray-800">Error {status}</h1>
        <p className="mt-4 text-gray-600">{message}</p>
        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition transform hover:-translate-y-1"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
