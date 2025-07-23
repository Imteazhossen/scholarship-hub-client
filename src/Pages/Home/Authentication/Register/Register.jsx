import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    // TODO: implement actual registration logic (e.g., Firebase Auth)
    toast.success('Registered successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 p-4">
      <ToastContainer />
      <div className="card w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-600 mb-2">
            Create an Account
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Register for Scholarship Hub
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="input input-bordered w-full mt-1"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="input input-bordered w-full mt-1"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                  validate: {
                    hasUpperCase: v => /[A-Z]/.test(v) || 'Must include an uppercase letter',
                    hasSpecialChar: v => /[!@#$%^&*(),.?"{}|<>]/.test(v) || 'Must include a special character'
                  }
                })}
                className="input input-bordered w-full mt-1"
                placeholder="********"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                {...register('image', { required: 'Image is required' })}
                accept="image/*"
                className="file-input file-input-bordered w-full mt-1"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full bg-sky-500 text-white hover:bg-sky-600 transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Existing Account Link */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
