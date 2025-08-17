import React, { useState }                from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm }                        from 'react-hook-form';
import Swal                               from 'sweetalert2';
import {
  FaInfoCircle,
  FaPen,
  FaTrashAlt,
  FaCommentDots
} from 'react-icons/fa';
import useAuth        from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading        from '../../../SharedComponents/Loading/Loading';

export default function Applications() {
  const { user, loading: authLoading } = useAuth();
  const api   = useAxiosSecure();
  const qc    = useQueryClient();
  const [editApp, setEditApp]     = useState(null);
  const [reviewApp, setReviewApp] = useState(null);

  // 1) Fetch current user's applications
  const { data: apps = [], isLoading, isError } = useQuery({
    queryKey: ['myApplications', user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      api.get(`/applications/user/${user.email}`).then(r => r.data)
  });

  // 2) Optimistic delete mutation
  const deleteMutation = useMutation({
    mutationFn: appId => api.delete(`/applications/${appId}`),
    onMutate: async appId => {
      await qc.cancelQueries(['myApplications', user.email]);
      const previous = qc.getQueryData(['myApplications', user.email]);
      qc.setQueryData(
        ['myApplications', user.email],
        old => old.filter(a => a._id !== appId)
      );
      return { previous };
    },
    onError: (_err, _appId, context) => {
      qc.setQueryData(['myApplications', user.email], context.previous);
      Swal.fire('Error', 'Could not delete.', 'error');
    },
    onSettled: () => {
      qc.invalidateQueries(['myApplications', user.email]);
    }
  });

  // 3) Early returns
  if (authLoading) return <Loading />;
  if (!user)
    return <p className="text-center pt-16">Please log in to view applications.</p>;
  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center pt-16 text-red-500">Failed to load.</p>;

  // 4) Handlers
  const cancelApplication = app =>
    Swal.fire({
      title: 'Cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    }).then(res => {
      if (res.isConfirmed) {
        deleteMutation.mutate(app._id, {
          onSuccess: () => Swal.fire('Deleted!', '', 'success')
        });
      }
    });

  return (
    <div className="md:p-8 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">My Applications</h1>
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                'University','Address','Feedback','Subject',
                'Degree','App Fee','Service','Status', `Actions`
              ].map(h => (
                <th key={h} className="px-4 py-2 text-left text-sm text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {apps.map(app => (
              <tr key={app._id}>
                <td className="px-4 py-2">{app.universityName}</td>
                <td className="px-4 py-2">{app.address}</td>
                <td className="px-4 py-2">{app.feedback || '—'}</td>
                <td className="px-4 py-2">{app.subjectCategory}</td>
                <td className="px-4 py-2">{app.applyingDegree}</td>
                <td className="px-4 py-2">${app.applicationFees}</td>
                <td className="px-4 py-2">${app.serviceCharge}</td>
                <td className="px-4 py-2 capitalize">{app.application_status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => window.location = `/scholarships/${app.scholarshipId}`}
                    title="Details"
                    className="text-sky-600 hover:text-sky-800">
                    <FaInfoCircle/>
                  </button>
                  <button
                    onClick={() => {
                      if (app.application_status !== 'pending') {
                        Swal.fire('Cannot edit','Processing in progress','info');
                      } else {
                        setEditApp(app);
                      }
                    }}
                    title="Edit"
                    className="text-green-600 hover:text-green-800">
                    <FaPen/>
                  </button>
                  <button
                    onClick={() => cancelApplication(app)}
                    title="Cancel"
                    className="text-red-600 hover:text-red-800">
                    <FaTrashAlt/>
                  </button>
                  <button
                    onClick={() => setReviewApp(app)}
                    title="Add Review"
                    className="text-purple-600 hover:text-purple-800">
                    <FaCommentDots/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editApp && (
        <Modal onClose={() => setEditApp(null)}>
          <h3 className="text-xl font-semibold mb-4">Edit Application</h3>
          <EditForm
            application={editApp}
            onSaved={() => {
              setEditApp(null);
              qc.invalidateQueries(['myApplications', user.email]);
            }}
          />
        </Modal>
      )}

      {/* Review Modal */}
      {reviewApp && (
        <Modal onClose={() => setReviewApp(null)}>
          <h3 className="text-xl font-semibold mb-4">Add Review</h3>
          <ReviewForm
            application={reviewApp}
            onSaved={() => {
              setReviewApp(null);
              qc.invalidateQueries(['reviews', reviewApp.scholarshipId]);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

// Modal Wrapper
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
        {children}
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300">
          Close
        </button>
      </div>
    </div>
  );
}

// EditForm Component
function EditForm({ application, onSaved }) {
  const api = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      address:        application.address,
      gender:         application.gender,
      applyingDegree: application.applyingDegree,
      sscResult:      application.sscResult,
      hscResult:      application.hscResult,
      studyGap:       application.studyGap
    }
  });

  const onSubmit = async data => {
    try {
      await api.patch(`/applications/${application._id}`, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      Swal.fire('Updated!', '', 'success');
      onSaved();
    } catch {
      Swal.fire('Error','Could not update','error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input
        {...register('address', { required: true })}
        className="w-full border p-2 rounded"
        placeholder="Address"
      />
      {errors.address && <p className="text-red-500">Required</p>}

      <select
        {...register('gender', { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      {errors.gender && <p className="text-red-500">Required</p>}

      <select
        {...register('applyingDegree', { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Degree</option>
        <option>Diploma</option>
        <option>Bachelor</option>
        <option>Masters</option>
      </select>
      {errors.applyingDegree && <p className="text-red-500">Required</p>}

      <div className="grid grid-cols-2 gap-2">
        <input
          {...register('sscResult', { required: true })}
          className="border p-2 rounded"
          placeholder="SSC Result"
        />
        <input
          {...register('hscResult', { required: true })}
          className="border p-2 rounded"
          placeholder="HSC Result"
        />
      </div>
      {(errors.sscResult || errors.hscResult) && (
        <p className="text-red-500">Required</p>
      )}

      <select {...register('studyGap')} className="w-full border p-2 rounded">
        <option value="">Study Gap</option>
        <option>None</option>
        <option>1 year</option>
        <option>2 years</option>
      </select>

      <button
        type="submit"
        className="w-full py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
      >
        Save Changes
      </button>
    </form>
  );
}

// ReviewForm Component
function ReviewForm({ application, onSaved }) {
  const api = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    try {
      await api.post('/reviews', {
        scholarshipId:   application.scholarshipId,
        scholarshipName: application.universityName + ' - ' + application.subjectCategory,
        universityName:  application.universityName,
        universityId:    application.scholarshipId,
        reviewerName:    user.displayName,
        reviewerEmail:   user.email,
        reviewerImage:   user.photoURL || '',
        rating:          Number(data.rating),
        comment:         data.comment
      });
      Swal.fire('Thank you!','Review submitted.','success');
      onSaved();
    } catch {
      Swal.fire('Error','Could not submit review.','error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <select
        {...register('rating', { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Rating</option>
        {[5,4,3,2,1].map(n => (
          <option key={n} value={n}>{n} star{n>1?'s':''}</option>
        ))}
      </select>
      {errors.rating && <p className="text-red-500">Required</p>}

      <textarea
        {...register('comment', { required: true })}
        className="w-full border p-2 rounded"
        placeholder="Your comments"
      />
      {errors.comment && <p className="text-red-500">Required</p>}

      <button
        type="submit"
        className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Submit Review
      </button>
    </form>
  );
}
