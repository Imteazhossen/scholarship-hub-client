// src/Pages/Dashboard/DashboardHome/User/Applications.jsx
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm }                   from 'react-hook-form';
import Swal                           from 'sweetalert2';
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

  // 1) Fetch applications
  const { data: apps = [], isLoading, isError } = useQuery({
    queryKey: ['myApplications', user?.email],
    enabled:  !!user?.email,
    queryFn:  () =>
      api.get(`/applications/user/${user.email}`).then(res => res.data)
  });

  // 2) Guard loading & auth
  if (authLoading) return <Loading />;
  if (!user) {
    return <p className="text-center pt-16">Please log in to view applications.</p>;
  }
  if (isLoading) return <Loading />;
  if (isError)  return <p className="text-center pt-16 text-red-500">Failed to load.</p>;

  // 3) Cancel
  function cancelApplication(app) {
    Swal.fire({
      title: 'Cancel this application?',
      icon:  'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(r => {
      if (r.isConfirmed) {
        api.patch(`/applications/${app._id}`, { application_status: 'Rejected' })
           .then(() => {
             Swal.fire('Canceled', '', 'success');
             qc.invalidateQueries(['myApplications']);
           });
      }
    });
  }

  return (
    <div className="p-8 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">My Applications</h1>
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                'University','Address','Feedback','Subject',
                'Degree','App Fee','Service','Status','Actions'
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
                    onClick={()=>window.location=`/scholarships/${app.scholarshipId}`}
                    title="Details"
                    className="text-sky-600 hover:text-sky-800">
                    <FaInfoCircle/>
                  </button>
                  <button
                    onClick={() => {
                      if (app.application_status !== 'pending') {
                        Swal.fire('Cannot edit','Processing in progress','info');
                      } else setEditApp(app);
                    }}
                    title="Edit"
                    className="text-green-600 hover:text-green-800">
                    <FaPen/>
                  </button>
                  <button
                    onClick={()=>cancelApplication(app)}
                    title="Cancel"
                    className="text-red-600 hover:text-red-800">
                    <FaTrashAlt/>
                  </button>
                  <button
                    onClick={()=>setReviewApp(app)}
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
        <Modal onClose={()=>setEditApp(null)}>
          <EditForm
            application={editApp}
            onSaved={()=>{
              setEditApp(null);
              qc.invalidateQueries(['myApplications']);
            }}
          />
        </Modal>
      )}

      {/* Review Modal */}
      {reviewApp && (
        <Modal onClose={()=>setReviewApp(null)}>
          <ReviewForm
            application={reviewApp}
            onSaved={()=>{
              setReviewApp(null);
              qc.invalidateQueries(['reviews', reviewApp.scholarshipId]);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

// Generic Modal
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

// EditForm & ReviewForm: same as before, just make sure to call `api.patch(...)` or `api.post('/reviews', ...)` and then call `onSaved()`.
