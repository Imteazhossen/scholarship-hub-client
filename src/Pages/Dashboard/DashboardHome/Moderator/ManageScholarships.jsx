// src/Pages/Dashboard/DashboardHome/Moderator/ManageScholarship.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaInfoCircle, FaPen, FaTrashAlt } from 'react-icons/fa';
import { NavLink } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';

export default function ManageScholarship() {
  const api = useAxiosSecure();
  const qc  = useQueryClient();
  const [editing, setEditing] = useState(null);

  // 1) Fetch all scholarships
  const { data:list = [], isLoading, isError } = useQuery({
    queryKey: ['scholarships'],
    queryFn: () => api.get('/scholarships').then(r => r.data)
  });

  // 2) Delete mutation
  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/scholarships/${id}`),
    onMutate: async id => {
      // optional optimistic update
      await qc.cancelQueries(['scholarships']);
      const prev = qc.getQueryData(['scholarships']);
      qc.setQueryData(['scholarships'], old => old.filter(s => s._id !== id));
      return { prev };
    },
    onError: (_err, _id, context) => {
      qc.setQueryData(['scholarships'], context.prev);
      Swal.fire('Error','Could not delete','error');
    },
    onSuccess: () => {
      qc.invalidateQueries(['scholarships']);
      Swal.fire('Deleted!','Scholarship removed.','success');
    }
  });

  // 3) Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/scholarships/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries(['scholarships']);
      Swal.fire('Updated!','Scholarship saved.','success');
      setEditing(null);
    },
    onError: () => Swal.fire('Error','Could not update','error')
  });

  if (isLoading) return <Loading />;
  if (isError)  return <p className="text-center py-8 text-red-500">Failed to load.</p>;

  return (
    <section className="p-8 bg-gradient-to-r rounded-2xl from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Scholarships</h1>

      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name','University','Subject','Degree','Application Fee','Actions (Details, Edit, Delete)'].map(h=>(
                <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {list.map(s => (
              <tr key={s._id}>
                <td className="px-4 py-4">{s.name}</td>
                <td className="px-4 py-4">{s.universityName}</td>
                <td className="px-4 py-4">{s.subjectCategory}</td>
                <td className="px-4 py-4">{s.degree}</td>
                <td className="px-4 py-4">${s.applicationFees}</td>
                <td className="flex justify-evenly items-center px-2 py-6 space-x-3">
                  <NavLink to={`/scholarships/${s._id}`} title="Details" className="text-sky-600 hover:text-sky-800">
                    <FaInfoCircle/>
                  </NavLink>
                  <button
                    onClick={() => setEditing(s)}
                    title="Edit"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaPen/>
                  </button>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Delete this scholarship?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes'
                      }).then(result => {
                        if (result.isConfirmed) {
                          deleteMutation.mutate(s._id);
                        }
                      });
                    }}
                    title="Delete"
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <EditForm
            scholarship={editing}
            onSave={data => updateMutation.mutate({ id: editing._id, data })}
          />
        </Modal>
      )}
    </section>
  );
}

// Full‑height, scrollable modal container
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start lg:items-center overflow-auto z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg mx-auto p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {children}
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function EditForm({ scholarship, onSave }) {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      name:                scholarship.name,
      universityName:      scholarship.universityName,
      subjectCategory:     scholarship.subjectCategory,
      scholarshipCategory: scholarship.scholarshipCategory,
      degree:              scholarship.degree,
      applicationFees:     scholarship.applicationFees,
      serviceCharge:       scholarship.serviceCharge,
      applicationDeadline: scholarship.applicationDeadline,
      postDate:            scholarship.postDate
    }
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name', { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">Required</p>}
      </div>

      {/* University */}
      <div>
        <label className="block text-sm font-medium text-gray-700">University</label>
        <input
          {...register('universityName', { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.universityName && <p className="text-red-500 text-sm">Required</p>}
      </div>

      {/* Subject Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject Category</label>
        <select
          {...register('subjectCategory', { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select…</option>
          <option>Agriculture</option>
          <option>Engineering</option>
          <option>Doctor</option>
        </select>
        {errors.subjectCategory && <p className="text-red-500 text-sm">Required</p>}
      </div>

      {/* Scholarship Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Scholarship Category</label>
        <select
          {...register('scholarshipCategory', { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select…</option>
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>
        {errors.scholarshipCategory && <p className="text-red-500 text-sm">Required</p>}
      </div>

      {/* Degree */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Degree</label>
        <select
          {...register('degree', { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select…</option>
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
          <option>Doctor</option>
        </select>
        {errors.degree && <p className="text-red-500 text-sm">Required</p>}
      </div>

      {/* Fees & Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">App Fees</label>
          <input
            type="number"
            {...register('applicationFees', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.applicationFees && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service Charge</label>
          <input
            type="number"
            {...register('serviceCharge', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.serviceCharge && <p className="text-red-500 text-sm">Required</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            {...register('applicationDeadline', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.applicationDeadline && <p className="text-red-500 text-sm">Required</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Date</label>
          <input
            type="date"
            {...register('postDate', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.postDate && <p className="text-red-500 text-sm">Required</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
      >
        Save Changes
      </button>
    </form>
  );
}
