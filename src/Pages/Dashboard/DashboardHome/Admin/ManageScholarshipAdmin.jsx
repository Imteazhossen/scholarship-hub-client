import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  FaTrashAlt,
  FaEdit,
  FaInfoCircle
} from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedComponents/Loading/Loading';



export default function ManageScholarshipAdmin() {
  const api = useAxiosSecure();
  const qc  = useQueryClient();
  const [editing, setEditing] = useState(null);

  // 1) fetch all scholarships
  const { data: list = [], isLoading, isError } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: () => api.get('/scholarships').then(r => r.data)
  });

  // 2) delete mutation
  const deleteScholar = useMutation({
    mutationFn: id => api.delete(`/scholarships/${id}`),
    onMutate: async id => {
      await qc.cancelQueries(['allScholarships']);
      const prev = qc.getQueryData(['allScholarships']);
      qc.setQueryData(
        ['allScholarships'],
        old => old.filter(s => s._id !== id)
      );
      return { prev };
    },
    onError: (_err, _id, context) => {
      qc.setQueryData(['allScholarships'], context.prev);
      Swal.fire('Error', 'Could not delete scholarship.', 'error');
    },
    onSuccess: () => {
      qc.invalidateQueries(['allScholarships']);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <p className="text-center py-8 text-red-500">
        Failed to load scholarships.
      </p>
    );

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Manage Scholarships
        </h2>
        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="min-w-full dark:text-black  divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Scholarship',
                  'University',
                  'Subject',
                  'Degree',
                  'Application Fee',
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
            <tbody className="divide-y  divide-gray-100">
              {list.map(s => (
                <tr key={s._id}>
                  <td className="px-4 py-2 text-sm">{s.name}</td>
                  <td className="px-4 py-2 text-sm">{s.universityName}</td>
                  <td className="px-4 py-2 text-sm">{s.subjectCategory}</td>
                  <td className="px-4 py-2 text-sm">{s.degree}</td>
                  <td className="px-4 py-2 text-sm">${s.applicationFees}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() =>
                        (window.location = `/scholarships/${s._id}`)
                      }
                      className="text-sky-600 hover:text-sky-800"
                      title="Details"
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      onClick={() => setEditing(s)}
                      className="text-green-600 hover:text-green-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: 'Delete this scholarship?',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Yes, delete'
                        }).then(res => {
                          if (res.isConfirmed)
                            deleteScholar.mutate(s._id);
                        })
                      }
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

        {/* Edit Modal */}
        {editing && (
          <ScholarEditModal
            scholarship={editing}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              qc.invalidateQueries(['allScholarships']);
            }}
          />
        )}
      </div>
    </section>
  );
}

// ————————————————————————————————
// Edit Modal + Form
function ScholarEditModal({ scholarship, onClose, onSaved }) {
  const api = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: scholarship.name,
      universityName: scholarship.universityName,
      country: scholarship.country,
      city: scholarship.city,
      worldRank: scholarship.worldRank,
      subjectCategory: scholarship.subjectCategory,
      scholarshipCategory: scholarship.scholarshipCategory,
      degree: scholarship.degree,
      tuitionFees: scholarship.tuitionFees,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      applicationDeadline: scholarship.applicationDeadline,
      postDate: scholarship.postDate,
    }
  });
  const [logoURL, setLogoURL] = useState(scholarship.logoURL);
  const [uploading, setUploading] = useState(false);

  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await api.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`,
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setLogoURL(res.data.data.url);
      Swal.fire({ icon: 'success', title: 'Logo uploaded', toast: true, position: 'top-end', timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire('Error', 'Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async data => {
    try {
      await api.patch(`/scholarships/${scholarship._id}`, {
        ...data,
        logoURL
      });
      Swal.fire({ icon: 'success', title: 'Updated!', toast: true, position: 'top-end', timer: 1500, showConfirmButton: false });
      onSaved();
    } catch {
      Swal.fire('Error', 'Update failed', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4 overflow-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold">Edit Scholarship</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label className="label"><span className="label-text">Scholarship Name</span></label>
            <input
              {...register('name', { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">Required</p>}
          </div>
          {/* University */}
          <div>
            <label className="label"><span className="label-text">University Name</span></label>
            <input
              {...register('universityName', { required: true })}
              className="input input-bordered w-full"
            />
            {errors.universityName && <p className="text-red-500 text-sm">Required</p>}
          </div>
          {/* Logo */}
          <div>
            <label className="label"><span className="label-text">University Logo</span></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="file-input file-input-bordered w-full"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
          </div>
          {/* Country & City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Country</span></label>
              <input
                {...register('country', { required: true })}
                className="input input-bordered w-full"
              />
              {errors.country && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">City</span></label>
              <input
                {...register('city', { required: true })}
                className="input input-bordered w-full"
              />
              {errors.city && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
          {/* World Rank */}
          <div>
            <label className="label"><span className="label-text">World Rank</span></label>
            <input
              type="number"
              {...register('worldRank', { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
            {errors.worldRank && <p className="text-red-500 text-sm">Required</p>}
          </div>
          {/* Selects */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                name: 'subjectCategory',
                label: 'Subject',
                opts: ['Agriculture','Engineering','Doctor']
              },
              {
                name: 'scholarshipCategory',
                label: 'Scholarship Category',
                opts: ['Full fund','Partial','Self-fund']
              },
              {
                name: 'degree',
                label: 'Degree',
                opts: ['Diploma','Bachelor','Masters']
              }
            ].map(({name,label,opts}) => (
              <div key={name}>
                <label className="label"><span className="label-text">{label}</span></label>
                <select
                  {...register(name,{ required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select…</option>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
                {errors[name] && <p className="text-red-500 text-sm">Required</p>}
              </div>
            ))}
          </div>
          {/* Fees & Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Tuition Fees (opt.)</span></label>
              <input
                type="number"
                {...register('tuitionFees')}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label"><span className="label-text">Application Fees</span></label>
              <input
                type="number"
                {...register('applicationFees',{required:true})}
                className="input input-bordered w-full"
              />
              {errors.applicationFees && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
          <div>
            <label className="label"><span className="label-text">Service Charge</span></label>
            <input
              type="number"
              {...register('serviceCharge',{required:true})}
              className="input input-bordered w-full"
            />
            {errors.serviceCharge && <p className="text-red-500 text-sm">Required</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Application Deadline</span></label>
              <input
                type="date"
                {...register('applicationDeadline',{required:true})}
                className="input input-bordered w-full"
              />
              {errors.applicationDeadline && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">Post Date</span></label>
              <input
                type="date"
                {...register('postDate',{required:true})}
                className="input input-bordered w-full"
              />
              {errors.postDate && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          <div className="text-right space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-sky-500 text-white hover:bg-sky-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
