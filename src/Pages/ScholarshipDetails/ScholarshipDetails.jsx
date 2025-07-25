// src/pages/ScholarshipDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaDollarSign,
    FaUniversity,
    FaClipboardList
} from 'react-icons/fa';

import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../SharedComponents/Loading/Loading';

export default function ScholarshipDetails() {
    const { id } = useParams();
    const api = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const {
        data: scholarship,
        isLoading: loadingSch,
        isError: errSch
    } = useQuery({
        queryKey: ['scholarship', id],
        queryFn: () => api.get(`/scholarships/${id}`).then(r => r.data),
    });

    const {
        data: reviews = [],
        isLoading: loadingRev
    } = useQuery({
        queryKey: ['reviews', id],
        queryFn: () => api.get(`/reviews?scholarshipId=${id}`).then(r => r.data),
    });

    if (authLoading || loadingSch) return <Loading />;
    if (errSch) return <p className="text-center py-8 text-red-500">Could not load scholarship.</p>;

    const {
        universityName,
        logoURL,
        scholarshipCategory,
        country,
        city,
        worldRank,
        applicationDeadline,
        name: subjectName,
        description,
        stipend,
        postDate,
        serviceCharge,
        applicationFees,
        subjectCategory
    } = scholarship;

    const rating = scholarship.rating ?? 0;

    const handleApply = () => navigate(`/payment/${id}`);

    return (
        <section className="py-16 mb-10 rounded-b-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Details */}
                <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 h-64 md:h-auto">
                        <img
                            src={logoURL}
                            alt={universityName}
                            className="w-full h-full object-contain p-4 bg-white"
                        />
                    </div>
                    {/* Info */}
                    <div className="md:w-2/3 p-8 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">{universityName}</h1>

                        <div className="flex flex-wrap gap-2">
                            <span className="badge bg-pink-100 badge-lg">{scholarshipCategory}</span>
                            <span className="badge bg-sky-100 badge-lg">{subjectCategory}</span>
                            <span className="badge bg-emerald-100 badge-lg">World Rank: {worldRank}</span>
                        </div>

                        <p className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-sky-500" /> {country}, {city}
                        </p>
                        <p className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-2 text-sky-500" /> Deadline:{' '}
                            <span className="font-medium">{new Date(applicationDeadline).toLocaleDateString()}</span>
                        </p>

                        <p className="text-gray-700">
                            <span className="font-semibold">Subject:</span> {subjectName}
                        </p>
                        {description && (
                            <p className="text-gray-700">
                                <span className="font-semibold">Description:</span> {description}
                            </p>
                        )}
                        {stipend != null && (
                            <p className="text-gray-700">
                                <span className="font-semibold">Stipend:</span> ${stipend}
                            </p>
                        )}

                        <p className="flex items-center text-gray-700">
                            <FaDollarSign className="mr-2 text-emerald-500" /> Application Fee:{' '}
                            <span className="font-medium">${applicationFees}</span>
                        </p>
                        <p className="flex items-center text-gray-700">
                            <FaDollarSign className="mr-2 text-purple-500" /> Service Charge:{' '}
                            <span className="font-medium">${serviceCharge}</span>
                        </p>
                        <p className="text-gray-500">
                            <span className="font-semibold">Posted on:</span>{' '}
                            {new Date(postDate).toLocaleDateString()}
                        </p>

                        <button
                            onClick={handleApply}
                            className="mt-4 w-full btn bg-sky-500 text-white hover:bg-sky-600 transition"
                        >
                            <FaClipboardList className="mr-2" /> Apply Scholarship
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="max-w-5xl mx-auto mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
                {loadingRev ? (
                    <Loading></Loading>
                ) : reviews.length === 0 ? (
                    <p className="text-center text-gray-600 italic">
                        No reviews yet. Be the first to share your experience!
                    </p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {reviews.map(r => (
                            <div
                                key={r._id}
                                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={r.reviewerImage || '/default-avatar.png'}
                                        alt={r.reviewerName || 'Anonymous'}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {r.reviewerName || 'Anonymous'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(r.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-yellow-400 mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < (r.rating ?? 0) ? '' : 'opacity-30'}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700">{r.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
