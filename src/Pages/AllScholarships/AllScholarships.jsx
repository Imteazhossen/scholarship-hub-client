// src/Pages/AllScholarship.jsx
import React, { useState } from 'react';
import { useQuery }        from '@tanstack/react-query';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaStar, FaSearch } from 'react-icons/fa';
import { NavLink }         from 'react-router';


import useAxios from '../../Hooks/useAxios';
import Loading from '../SharedComponents/Loading/Loading';

export default function AllScholarship() {
  const api = useAxios();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: () => api.get('/scholarships').then(r => r.data),
  });

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm,  setSearchTerm]  = useState('');
  const [page,        setPage]        = useState(1);
  const pageSize = 9;

  // Filter by name, universityName, or degree
  const filtered = data.filter(s => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.universityName.toLowerCase().includes(term) ||
      s.degree.toLowerCase().includes(term)
    );
  });

  const pageCount = Math.ceil(filtered.length / pageSize);
  const start     = (page - 1) * pageSize;
  const pageData  = filtered.slice(start, start + pageSize);

  const handleSearch = e => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    setPage(1);
  };

  if (isLoading) return <Loading></Loading>;
  if (isError)   return <p className="text-center py-8 text-red-500">Failed to load scholarships.</p>;

  return (
    <section className="py-16 bg-gradient-to-r mb-10 rounded-b-2xl from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-sky-600 mb-8">
          All Scholarships
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex justify-center mb-12">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by scholarship, university, or degree"
            className="input input-bordered w-full max-w-lg mr-2"
          />
          <button
            type="submit"
            className="btn bg-sky-500 text-white hover:bg-sky-600 px-4"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </form>

        {/* No results */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">No scholarships found.</p>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pageData.map(s => {
                const rating = typeof s.rating === 'number' ? s.rating : 0;
                return (
                  <article
                    key={s._id}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={s.logoURL}
                        alt={s.universityName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between h-[260px]">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {s.universityName}
                        </h3>
                        <p className="text-sm text-gray-600">{s.name}</p>
                        <p className="flex items-center text-gray-500 text-sm">
                          <FaMapMarkerAlt className="mr-1 text-sky-500"/> {s.country}, {s.city}
                        </p>
                        <p className="flex items-center text-gray-500 text-sm">
                          <FaCalendarAlt className="mr-1 text-sky-500"/> {new Date(s.applicationDeadline).toLocaleDateString()}
                        </p>
                        <p className="flex items-center text-gray-700">
                          <FaDollarSign className="mr-1 text-emerald-500"/> ${s.applicationFees}
                        </p>
                      </div>
                      <div>
                        <div className="rating rating-sm">
                          {Array.from({ length: 5 }, (_, i) => (
                            <input
                              key={i}
                              type="radio"
                              name={`rating-${s._id}`}
                              className="mask mask-star-2 bg-yellow-400"
                              checked={i < Math.round(rating)}
                              readOnly
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          ({rating.toFixed(1)})
                        </p>
                        <NavLink
                          to={`/scholarships/${s._id}`}
                          className="block text-center mt-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
                        >
                          See more
                        </NavLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="btn btn-sm"
                >
                  Prev
                </button>
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`btn btn-sm ${page === i + 1 ? 'bg-sky-500 text-white' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(p + 1, pageCount))}
                  disabled={page === pageCount}
                  className="btn btn-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
