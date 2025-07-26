import React, { useState, useEffect, use } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
// import { loadStripe }                     from '@stripe/stripe-js';
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../SharedComponents/Loading/Loading';



// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutForm({ clientSecret, applicationId }) {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);

    // console.log(user);

    const handlePayment = async e => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setProcessing(true);

        // 1) Create PaymentMethod
        const card = elements.getElement(CardElement);
        const { error: pmError, paymentMethod } =
            await stripe.createPaymentMethod({
                type: 'card',
                card,
                billing_details: {
                    name: user.displayName,
                    email: user.email
                }
            });
        if (pmError) {
            toast.error(pmError.message);
            setProcessing(false);
            return;
        }

        // 2) Confirm PaymentIntent
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id
            });
        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
            return;
        }

        // 3) Patch application record: mark paid + add user/scholarship info
        try {
            await axiosSecure.patch(`/applications/${applicationId}`, {
                paymentIntentId: paymentIntent.id,
                payment_status: 'paid',
                paymentAt: new Date().toISOString(),
                userName: user.displayName,
                userEmail: user.email,
                userId: user.uid
            });
            Swal.fire({
                icon: 'success',
                title: 'Payment & Application Complete!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                background: '#eff6ff',
                iconColor: '#0ea5e9'
            });
        } catch (err) {
            console.error(err);
            toast.error('Failed to finalize application');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
                Enter Card Details
            </h3>
            <div className="p-4 bg-white rounded-xl shadow-inner">
                <CardElement
                    options={{
                        style: {
                            base: { fontSize: '16px', color: '#424770' },
                            invalid: { color: '#9e2146' }
                        }
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || processing}
                className={`w-full py-2 rounded-lg text-white transition 
          ${processing ? 'bg-gray-400' : 'bg-sky-500 hover:bg-sky-600'}`}
            >
                {processing ? 'Processing…' : 'Pay & Submit'}
            </button>
        </form>
    );
}

export default function Payment() {
    const { id: scholarshipId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const [scholarship, setScholarship] = useState(null);
    const [applicationId, setApplicationId] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [uploading, setUploading] = useState(false);

    // console.log(user.email);

    const { register, handleSubmit, formState: { errors } } = useForm();

    // 1) fetch scholarship details
    useEffect(() => {
        axiosSecure.get(`/scholarships/${scholarshipId}`)
            .then(r => setScholarship(r.data))
            .catch(() => toast.error('Failed to load scholarship'));
    }, [scholarshipId]);

    // 2) after saving application info, init Stripe PaymentIntent
    useEffect(() => {
        if (!formSubmitted || !scholarship) return;
        axiosSecure.post('/create-payment-intent', {
            amount: scholarship.applicationFees * 100
        })
            .then(r => setClientSecret(r.data.clientSecret))
            .catch(() => toast.error('Payment initialization failed'));
    }, [formSubmitted, scholarship]);

    if (authLoading || !scholarship) return <Loading></Loading>;

    // upload applicant photo to imgbb
    const handleImageUpload = async e => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const form = new FormData();
        form.append('image', file);
        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`,
                form
            );
            setPhotoURL(res.data.data.url);
            toast.success('Photo uploaded');
        } catch {
            toast.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    };
    console.log(scholarship); //fees r service charge dekhate hobe
    // Stage 1: save all applicant info + pending status
    const onSubmit = async data => {
        if (!photoURL) {
            toast.error('Please upload your photo');
            return;
        }
        const application = {
            phone: data.phone,
            photoURL,
            address: data.address,
            gender: data.gender,
            applyingDegree: data.applyingDegree,
            sscResult: data.sscResult,
            hscResult: data.hscResult,
            studyGap: data.studyGap || 'None',
            scholarshipId,
            universityName: scholarship.universityName,
            scholarshipCategory: scholarship.scholarshipCategory,
            subjectCategory: scholarship.subjectCategory,
            serviceCharge: scholarship.serviceCharge,
            applicationFees: scholarship.applicationFees,
            userEmail: user.email,
            userName: user.displayName,
            payment_status: 'pending',
            application_status: 'pending',
            createdAt: new Date().toISOString()
        };
        try {
            const res = await axiosSecure.post('/applications', application);
            setApplicationId(res.data.insertedId);
            setFormSubmitted(true);
            toast.success('Application saved! Please proceed to payment.');
        } catch {
            toast.error('Failed to save application');
        }
    };

    return (
        <section className="py-16 bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8">
                <h2 className="text-2xl font-bold text-center text-sky-600">
                    Application & Payment
                </h2>

                {/* Stage 1: Application Form */}
                {!formSubmitted ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                {...register('phone', { required: 'Required' })}
                                className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        {/* Photo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Applicant Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                            />
                            {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Address (village, district, country)
                            </label>
                            <input
                                {...register('address', { required: 'Required' })}
                                className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Gender & Degree */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    {...register('gender', { required: 'Required' })}
                                    className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                                >
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Applying Degree</label>
                                <select
                                    {...register('applyingDegree', { required: 'Required' })}
                                    className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                                >
                                    <option value="">Select</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>
                                {errors.applyingDegree && <p className="text-red-500 text-sm">{errors.applyingDegree.message}</p>}
                            </div>
                        </div>

                        {/* SSC & HSC Results */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SSC Result</label>
                                <input
                                    {...register('sscResult', { required: 'Required' })}
                                    className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                                />
                                {errors.sscResult && <p className="text-red-500 text-sm">{errors.sscResult.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">HSC Result</label>
                                <input
                                    {...register('hscResult', { required: 'Required' })}
                                    className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                                />
                                {errors.hscResult && <p className="text-red-500 text-sm">{errors.hscResult.message}</p>}
                            </div>
                        </div>

                        {/* Study Gap */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Study Gap (optional)</label>
                            <select
                                {...register('studyGap')}
                                className="w-full border-2 border-sky-300 rounded-lg p-2 focus:border-emerald-400"
                            >
                                <option value="">None</option>
                                <option>1 year</option>
                                <option>2 years</option>
                            </select>
                        </div>

                        {/* Scholarship Info (read-only) */}
                        <div className="bg-sky-50 p-4 rounded-lg border-2 border-sky-200">
                            <p><strong>University:</strong> {scholarship.universityName}</p>
                            <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
                            <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-600 transition"
                        >
                            Submit Application Info
                        </button>
                    </form>
                ) : (
                    // Stage 2: show Stripe payment form
                    clientSecret && (
                        <div className="mt-8 p-6 bg-white rounded-2xl shadow-inner animate-fade-in">
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm
                                    clientSecret={clientSecret}
                                    applicationId={applicationId}
                                />
                            </Elements>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
