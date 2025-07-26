import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaStar, FaUniversity, FaBook } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';


export default function AllReviews() {
    const api = useAxiosSecure();
    const qc = useQueryClient();

    // 1) Fetch all reviews
    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ['allReviews'],
        queryFn: () => api.get('/reviews/all').then(r => r.data)
    });

    // 2) Delete mutation
    const deleteMutation = useMutation({
        mutationFn: id => api.delete(`/reviews/${id}`),
        onMutate: async id => {
            await qc.cancelQueries(['allReviews']);
            const prev = qc.getQueryData(['allReviews']);
            qc.setQueryData(['allReviews'], old => old.filter(r => r._id !== id));
            return { prev };
        },
        onError: (_err, _id, context) => {
            qc.setQueryData(['allReviews'], context.prev);
            Swal.fire('Error', 'Could not delete review.', 'error');
        },
        onSuccess: () => {
            qc.invalidateQueries(['allReviews']);
            Swal.fire('Deleted!', 'Review removed.', 'success');
        }
    });

    if (isLoading) return <Loading></Loading>;
    if (isError) return <p className="text-center py-8 text-red-500">Failed to load reviews.</p>;

    return (
        <section className="py-16 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    All Reviews
                </h2>
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-600">No reviews found.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {reviews.map(r => (
                            <div key={r._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                                <div className="p-4 flex items-center border-b">
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
                                <div className="p-4 flex-1 space-y-2">
                                    <p className="flex items-center text-gray-700">
                                        <FaUniversity className="mr-2 text-sky-500" /> {r.universityName}
                                    </p>
                                    <p className="flex items-center text-gray-700">
                                        <FaBook className="mr-2 text-emerald-500" /><small>{r.scholarshipName}</small>
                                    </p>
                                    <div className="flex items-center text-yellow-400">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < (r.rating ?? 0) ? '' : 'opacity-30'}
                                            />
                                        ))}
                                        <span className="ml-2 text-gray-600">({(r.rating ?? 0).toFixed(1)})</span>
                                    </div>
                                    <p className="text-gray-700 italic">"{r.comment}"</p>
                                </div>
                                <div className="p-4 border-t text-right">
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Delete this review?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, delete'
                                            }).then(result => {
                                                if (result.isConfirmed) deleteMutation.mutate(r._id);
                                            });
                                        }}
                                        className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        <FaTrashAlt className="mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
