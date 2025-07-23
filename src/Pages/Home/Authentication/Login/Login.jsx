import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import Social from '../../../SharedComponents/Social/Social';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 p-4">
      <div className="card w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-600 mb-2">
            Login!
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Login to your Scholarship Hub account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="input input-bordered w-full mt-1"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' }
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
        
          {/* Register Link */}
          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-sky-500 hover:underline"
            >
              Register
            </Link>
          </p>

            {/* Login Button */}
            <button
              type="submit"
              className="btn w-full bg-sky-500 text-white hover:bg-sky-600 transition duration-300"
            >
              Login
            </button>
          </form>
          {/* Divider */}
          <div className="divider my-8">OR</div>
          {/* Social Login */}
          <div className="flex justify-center items-center space-x-4">
              <FaGoogle />
            <Social></Social>
          </div>
        </div>
      </div>
    </div>
  );
}
