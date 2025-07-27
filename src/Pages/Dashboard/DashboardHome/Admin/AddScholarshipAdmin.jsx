import React from 'react';
import { useForm } from 'react-hook-form';
import { toast }    from 'react-toastify';
import Swal         from 'sweetalert2';
import axios        from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import useAxios from '../../../../Hooks/useAxios';
import useAuth from '../../../../Hooks/useAuth';

export default function AddScholarshipAdmin() {
  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const api    = useAxios();
  const { user } = useAuth();

  const onSubmit = async data => {
    try {
      // 1) upload logo to imgbb
      const file = data.logo[0];
      const form = new FormData();
      form.append('image', file);
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const logoURL = uploadRes.data.data.url;

      // 2) assemble scholarship object
      const scholarship = {
        name:                data.name,
        universityName:      data.universityName,
        logoURL,
        country:             data.country,
        city:                data.city,
        worldRank:           Number(data.worldRank),
        subjectCategory:     data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree:              data.degree,
        tuitionFees:         data.tuitionFees ? Number(data.tuitionFees) : null,
        applicationFees:     Number(data.applicationFees),
        serviceCharge:       Number(data.serviceCharge),
        applicationDeadline: data.applicationDeadline,
        postDate:            data.postDate,
        postedBy:            user.email        // admin’s email
      };

      // 3) post to your backend
      await api.post('/scholarships', scholarship);

      // 4) notify & reset
      Swal.fire({
        icon:         'success',
        title:        'Scholarship Added!',
        text:         `${scholarship.name} was successfully created.`,
        timer:        2000,
        toast:        true,
        position:     'top-end',
        showConfirmButton: false,
        background:   '#eff6ff',
        iconColor:    '#0ea5e9'
      });
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.response?.data?.error || err.message, 'error');
    }
  };

  return (
    <section className="py-16 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-sky-600 mb-6">
          Add New Scholarship
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Scholarship Name */}
          <div>
            <label className="label"><span className="label-text">Scholarship Name</span></label>
            <input
              {...register('name',{ required: 'Required' })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* University Name */}
          <div>
            <label className="label"><span className="label-text">University Name</span></label>
            <input
              {...register('universityName',{ required: 'Required' })}
              className="input input-bordered w-full"
            />
            {errors.universityName && <p className="text-red-500 text-sm">{errors.universityName.message}</p>}
          </div>

          {/* University Logo */}
          <div>
            <label className="label"><span className="label-text">University Logo</span></label>
            <input
              type="file"
              accept="image/*"
              {...register('logo',{ required: 'Upload required' })}
              className="file-input file-input-bordered w-full"
            />
            {errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>}
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Country</span></label>
              <input
                {...register('country',{ required: 'Required' })}
                className="input input-bordered w-full"
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">City</span></label>
              <input
                {...register('city',{ required: 'Required' })}
                className="input input-bordered w-full"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>
          </div>

          {/* World Rank */}
          <div>
            <label className="label"><span className="label-text">University World Rank</span></label>
            <input
              type="number"
              {...register('worldRank',{ required: 'Required', min: 1 })}
              className="input input-bordered w-full"
            />
            {errors.worldRank && <p className="text-red-500 text-sm">{errors.worldRank.message}</p>}
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label"><span className="label-text">Subject Category</span></label>
              <select
                {...register('subjectCategory',{ required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select…</option>
                <option>Agriculture</option>
                <option>Engineering</option>
                <option>Doctor</option>
              </select>
              {errors.subjectCategory && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">Scholarship Category</span></label>
              <select
                {...register('scholarshipCategory',{ required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select…</option>
                <option>Full fund</option>
                <option>Partial</option>
                <option>Self-fund</option>
              </select>
              {errors.scholarshipCategory && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">Degree</span></label>
              <select
                {...register('degree',{ required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select…</option>
                <option>Doctor</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
              {errors.degree && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Fees & Charges */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Tuition Fees (optional)</span></label>
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
                {...register('applicationFees',{ required: true })}
                className="input input-bordered w-full"
              />
              {errors.applicationFees && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Service Charge */}
          <div>
            <label className="label"><span className="label-text">Service Charge</span></label>
            <input
              type="number"
              {...register('serviceCharge',{ required: true })}
              className="input input-bordered w-full"
            />
            {errors.serviceCharge && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Application Deadline</span></label>
              <input
                type="date"
                {...register('applicationDeadline',{ required: true })}
                className="input input-bordered w-full"
              />
              {errors.applicationDeadline && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label"><span className="label-text">Post Date</span></label>
              <input
                type="date"
                {...register('postDate',{ required: true })}
                className="input input-bordered w-full"
              />
              {errors.postDate && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Posted By */}
          <div>
            <label className="label"><span className="label-text">Posted By</span></label>
            <input
              value={user.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn bg-sky-500 text-white hover:bg-sky-600 transition"
          >
            Add Scholarship
          </button>
        </form>
      </div>
    </section>
  );
}
