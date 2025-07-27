import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  FaInfoCircle,
  FaCommentDots,
  FaTimesCircle,
  FaCheckCircle
} from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';


export default function ManageAppliedApplication() {
  const api = useAxiosSecure();
  const qc  = useQueryClient();

  const [viewing, setViewing]     = useState(null);
  const [feedbacking, setFeedbacking] = useState(null);

  // 1) Fetch all applications
  const {
    data: apps = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['allApplications'],
    queryFn: () => api.get('/applications').then(r => r.data)
  });

  // 2) Mutations
  // patch status + feedback
  const patchApp = useMutation({
    mutationFn: ({ id, updates }) =>
      api.patch(`/applications/${id}`, updates),
    onSuccess: () => {
      qc.invalidateQueries(['allApplications']);
      Swal.fire({ icon: 'success', toast: true, position: 'top-end',
        timer: 1500, showConfirmButton: false });
    },
    onError: () => {
      Swal.fire('Error', 'Could not update.', 'error');
    }
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <p className="text-center py-8 text-red-500">
        Failed to load applications.
      </p>
    );

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Manage All Applications
        </h2>

        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="min-w-full  shadow-xl divide-y divide-sky-400">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'University',
                  'Applied By',
                  'Degree',
                  'Category',
                  'Status',
                  'Actions'
                ].map(h => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-400">
              {apps.map(a => (
                <tr key={a._id}>
                  <td className="px-4 py-2 text-sm">{a.universityName}</td>
                  <td className="px-4 py-2 text-sm">{a.userName}</td>
                  <td className="px-4 py-2 text-sm">{a.applyingDegree}</td>
                  <td className="px-4 py-2 text-sm">{a.scholarshipCategory}</td>
                  <td className="px-4 py-2 text-sm capitalize">
                    {a.application_status}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {/* Details */}
                    <button
                      onClick={() => setViewing(a)}
                      className="text-sky-600 hover:text-sky-800"
                      title="Details"
                    >
                      <FaInfoCircle />
                    </button>

                    {/* Feedback */}
                    <button
                      onClick={() => setFeedbacking(a)}
                      className="text-purple-600 hover:text-purple-800"
                      title="Feedback"
                    >
                      <FaCommentDots />
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() =>
                        patchApp.mutate({ 
                          id: a._id,
                          updates: { 
                            application_status: 'Rejected' 
                          }
                        })
                      }
                      className="text-red-600 hover:text-red-800"
                      title="Cancel"
                    >
                      <FaTimesCircle />
                    </button>

                    {/* Accept */}
                    <button
                      onClick={() =>
                        patchApp.mutate({ 
                          id: a._id,
                          updates: { 
                            application_status: 'Completed' 
                          }
                        })
                      }
                      className="text-green-600 hover:text-green-800"
                      title="Accept"
                    >
                      <FaCheckCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Modal */}
        {viewing && (
          <Modal onClose={() => setViewing(null)}>
            <h3 className="text-xl font-semibold mb-4">Application Details</h3>
            <p><strong>University:</strong> {viewing.universityName}</p>
            <p><strong>Degree:</strong> {viewing.applyingDegree}</p>
            <p><strong>Category:</strong> {viewing.scholarshipCategory}</p>
            <p><strong>Status:</strong> {viewing.application_status}</p>
          </Modal>
        )}

        {/* Feedback Modal */}
        {feedbacking && (
          <Modal onClose={() => setFeedbacking(null)}>
            <FeedbackForm
              app={feedbacking}
              onSave={(feedback) => {
                patchApp.mutate({
                  id: feedbacking._id,
                  updates: {
                    feedback,
                    application_status: 'processing'
                  }
                });
                setFeedbacking(null);
              }}
            />
          </Modal>
        )}
      </div>
    </section>
  );
}

// ———————————————————————————
// Generic Modal
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 overflow-auto max-h-[90vh]">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ———————————————————————————
// Feedback Form
function FeedbackForm({ app, onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form
      onSubmit={handleSubmit(data => onSave(data.feedback))}
      className="space-y-4"
    >
      <h3 className="text-lg font-medium">Give Feedback</h3>
      <textarea
        {...register('feedback', { required: true })}
        className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
        placeholder="Enter your feedback..."
      />
      {errors.feedback && <p className="text-red-500 text-sm">Required</p>}

      <button
        type="submit"
        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Submit Feedback
      </button>
    </form>
  );
}
