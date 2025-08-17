// src/Pages/Dashboard/DashboardHome/User/MyReviews.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';


export default function MyReviews() {
  const { user, loading: authLoading } = useAuth();
  const api = useAxiosSecure();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  // 1) Fetch current user’s reviews
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['myReviews', user?.email],
    enabled: !!user?.email,
    queryFn: () => api.get(`/reviews/user/${user.email}`).then(r => r.data),
  });

  // 2) Deletion mutation
  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/reviews/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(['myReviews', user.email]);
      Swal.fire('Deleted', 'Your review was removed.', 'success');
    },
  });

  // 3) Edit mutation
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/reviews/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries(['myReviews', user.email]);
      Swal.fire('Saved', 'Your review was updated.', 'success');
      setEditing(null);
    },
  });

  // 4) react-hook-form for edit modal
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Guards
  if (authLoading) return <Loading></Loading>;
  if (!user) return <p className="text-center py-16">Please log in to view reviews.</p>;
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center py-16 text-red-500">Failed to load reviews.</p>;

  // 5) Handlers
  const onDelete = id => {
    Swal.fire({
      title: 'Delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const onEditOpen = review => {
    setEditing(review);
    reset({ rating: review.rating, comment: review.comment });
  };

  const onEditSubmit = data => {
    editMutation.mutate({ id: editing._id, data: { rating: Number(data.rating), comment: data.comment } });
  };

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-black">My Reviews</h1>

        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Scholarship Name', 'University', 'Comments', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:text-black divide-gray-100">
              {reviews.map(r => (
                <tr key={r._id}>
                  <td className="px-4 py-2">{r.scholarshipName}</td>
                  <td className="px-4 py-2">{r.universityName}</td>
                  <td className="px-4 py-2">{r.comment}</td>
                  <td className="px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => onEditOpen(r)}
                      className="text-green-600 hover:text-green-800"
                      title="Edit"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => onDelete(r._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-semibold">Edit Review</h2>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <select
                  {...register('rating', { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select…</option>
                  {[5,4,3,2,1].map(n => (
                    <option key={n} value={n}>{n} star{n>1?'s':''}</option>
                  ))}
                </select>
                {errors.rating && <p className="text-red-500 text-sm">Required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  {...register('comment', { required: true })}
                  className="w-full border p-2 rounded"
                  rows={3}
                />
                {errors.comment && <p className="text-red-500 text-sm">Required</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
