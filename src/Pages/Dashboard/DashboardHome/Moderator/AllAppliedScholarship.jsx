import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  FaInfoCircle,
  FaCommentDots,
  FaTimesCircle,
  FaCheckCircle
} from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';

export default function AllAppliedScholarship() {
  const api = useAxiosSecure();
  const qc  = useQueryClient();

  const [detailApp, setDetailApp]     = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  // 1) fetch all applications
  const { data: apps = [], isLoading, isError } = useQuery({
    queryKey: ['allApplications'],
    queryFn: () => api.get('/applications/all').then(r => r.data)
  });

  // 2) Mutate application (status & feedback)
  const updateApp = useMutation({
    mutationFn: ({ id, payload }) => api.patch(`/applications/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries(['allApplications']);
      Swal.fire('Success', '', 'success');
    },
    onError: () => Swal.fire('Error','Could not update application.','error')
  });

  // handlers
  const handleCancel = app =>
    Swal.fire({
      title: 'Reject this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject'
    }).then(res => {
      if (res.isConfirmed) {
        updateApp.mutate({ id: app._id, payload: { application_status: 'rejected' } });
      }
    });

  const handleAccept = app =>
    Swal.fire({
      title: 'Accept this application?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept'
    }).then(res => {
      if (res.isConfirmed) {
        updateApp.mutate({ id: app._id, payload: { application_status: 'completed' } });
      }
    });

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim()) {
      return Swal.fire('Required','Please enter feedback','info');
    }
    updateApp.mutate({
      id: feedbackApp._id,
      payload: {
        feedback: feedbackText,
        application_status: 'processing'
      }
    });
    setFeedbackApp(null);
    setFeedbackText('');
  };

  if (isLoading) return <Loading />;
  if (isError)  return <p className="text-center py-8 text-red-500">Failed to load applications.</p>;

  return (
    <div className="p-8 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Applied Scholarships</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Applicant','University','Degree','Status','Actions'].map(h => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {apps.map(app => (
              <tr key={app._id}>
                <td className="px-4 py-2 text-sm">
                  {app.userName}<br/>
                  <span className="text-xs text-gray-500">{app.userEmail}</span>
                </td>
                <td className="px-4 py-2 text-sm">{app.universityName}</td>
                <td className="px-4 py-2 text-sm">{app.applyingDegree}</td>
                <td className="px-4 py-2 text-sm capitalize">{app.application_status}</td>
                <td className="px-4 py-2 text-sm space-x-2">
                  <button
                    onClick={() => setDetailApp(app)}
                    title="Details"
                    className="text-sky-600 hover:text-sky-800"
                  >
                    <FaInfoCircle/>
                  </button>
                  <button
                    onClick={() => setFeedbackApp(app)}
                    title="Feedback"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <FaCommentDots/>
                  </button>
                  <button
                    onClick={() => handleCancel(app)}
                    title="Reject"
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTimesCircle/>
                  </button>
                  <button
                    onClick={() => handleAccept(app)}
                    title="Accept"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaCheckCircle/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {detailApp && (
        <Modal onClose={() => setDetailApp(null)}>
          <h3 className="text-xl font-semibold mb-4">Application Details</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>Applicant:</strong> {detailApp.userName} ({detailApp.userEmail})</li>
            <li><strong>University:</strong> {detailApp.universityName}</li>
            <li><strong>Degree:</strong> {detailApp.applyingDegree}</li>
            <li><strong>Scholarship Cat.:</strong> {detailApp.scholarshipCategory}</li>
            <li><strong>Subject:</strong> {detailApp.subjectCategory}</li>
            <li><strong>Applied On:</strong> {new Date(detailApp.createdAt).toLocaleDateString()}</li>
            <li><strong>Status:</strong> {detailApp.application_status}</li>
            {detailApp.feedback && (
              <li><strong>Feedback:</strong> {detailApp.feedback}</li>
            )}
          </ul>
        </Modal>
      )}

      {/* Feedback Modal */}
      {feedbackApp && (
        <Modal onClose={() => setFeedbackApp(null)}>
          <h3 className="text-xl font-semibold mb-4">Give Feedback</h3>
          <textarea
            value={feedbackText}
            onChange={e => setFeedbackText(e.target.value)}
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Enter moderator feedback…"
          />
          <button
            onClick={handleFeedbackSubmit}
            className="mt-4 w-full py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
          >
            Submit Feedback
          </button>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
        {children}
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >Close</button>
      </div>
    </div>
  );
}
