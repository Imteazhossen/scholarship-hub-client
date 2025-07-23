import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../../Hooks/useAuth';
import useAxios from '../../../../Hooks/useAxios';
import axios from 'axios';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const api = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const returnTo = location.state?.from || '/';

    const onSubmit = async data => {
        try {
            // 1) Upload image to Imgbb
            const file = data.image[0];
            const formData = new FormData();
            formData.append('image', file);
            const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;
            const uploadRes = await axios.post(uploadUrl, formData);
            const photoURL = uploadRes.data.data.url;

            // 2) Create user in Firebase Auth
            const result = await createUser(data.email, data.password);

            // 3) Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL
            });

            // 4) Build your backend record
            const userRecord = {
                name: data.name,
                email: result.user.email,
                photoURL,                    // now guaranteed non‑empty
                role: 'user',
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };

            // 5) Persist to your MongoDB via your API
            await api.post('/users', userRecord);

            toast.success('Registered successfully!');
            navigate(returnTo);

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 p-4">
            <ToastContainer />
            <div className="card w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-600 mb-4">
                        Create an Account
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                className="input input-bordered w-full mt-1"
                                placeholder="Your full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                                })}
                                className="input input-bordered w-full mt-1"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Min 6 chars' },
                                    validate: {
                                        hasUpper: v => /[A-Z]/.test(v) || 'Must have uppercase',
                                        hasSpecial: v => /[!@#$%^&*]/.test(v) || 'Must have special char'
                                    }
                                })}
                                className="input input-bordered w-full mt-1"
                                placeholder="********"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register('image', { required: 'Image is required' })}
                                className="file-input file-input-bordered w-full mt-1"
                            />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn w-full bg-sky-500 text-white hover:bg-sky-600 transition"
                        >
                            Register
                        </button>

                        <p className="text-center text-gray-500 mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-sky-500 hover:underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
