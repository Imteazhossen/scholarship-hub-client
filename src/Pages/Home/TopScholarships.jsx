// src/components/TopScholarships.jsx 
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaStar } from 'react-icons/fa';
import { NavLink } from 'react-router';
import useAxios from '../../Hooks/useAxios';

export default function TopScholarships() {
  const api = useAxios();

  const { data: scholarships = [], isLoading, isError } = useQuery({
    queryKey: ['topScholarships'],
    queryFn: () => api.get('/scholarships/top').then(res => res.data),
  });

  if (isLoading) {
    return <p className="text-center py-8">Loading top scholarships…</p>;
  }
  if (isError) {
    return <p className="text-center py-8 text-red-500">Failed to load.</p>;
  }

  return (
    <section className="py-16 bg-gradient-to-r md:rounded-2xl md:my-10 from-pink-50 via-sky-100 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Top Scholarships
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.map(s => {
            // Safely default rating to 0
            const rating = typeof s.rating === 'number' ? s.rating : 0;
            return (
              <div
                key={s._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105"
              >
                <img
                  src={s.logoURL}
                  alt={s.universityName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">{s.universityName}</h3>
                  <p className="text-sm text-gray-600">{s.name}</p>
                  <p className="flex items-center text-gray-500 text-sm">
                    <FaMapMarkerAlt className="mr-1" /> {s.country}, {s.city}
                  </p>
                  <p className="flex items-center text-gray-500 text-sm">
                    <FaCalendarAlt className="mr-1" /> Deadline:{' '}
                    {new Date(s.applicationDeadline).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Subject:</span> {s.subjectCategory}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaDollarSign className="mr-1" /> Fee: ${s.applicationFees}
                  </p>
                  <p className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(rating) ? '' : 'opacity-30'}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({rating.toFixed(1)})
                    </span>
                  </p>
                  <NavLink
                    to={`/scholarships/${s._id}`}
                    className="block text-center mt-4 text-white bg-sky-500 rounded-full py-2 hover:bg-sky-600 transition"
                  >
                    See more 
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <NavLink
            to="/allScholarships"
            className="inline-block px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition transform hover:scale-105"
          >
            View All Scholarships
          </NavLink>
        </div>
      </div>
    </section>
  );
}
