import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';

import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../SharedComponents/Loading/Loading';


const PaymentForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');

    const { scholarshipId } = useParams();

    const { isPending, data: scholarshipInfo = {} } = useQuery({
        queryKey: ['scholarships', scholarshipId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
            return res.data;
        }

    });

    if (isPending) {
        return <Loading></Loading>;
    }
    console.log(scholarshipInfo);

    const amount = scholarshipInfo.applicationFees
    const amountInCents = amount * 100;
    console.log(amountInCents);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('PaymentMethod', paymentMethod);
        }

        //step-2 create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            scholarshipId
        })

        const clientSecret = res.data.clientSecret;


        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        })

        if (result.error) {
            setError(result.error.message);
        }
        else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded');
                console.log(result);

                //step-4 mark scholarship paid also create payment history 
                const paymentData = {
                    scholarshipId,
                    email: user.email,
                    amount,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types,
                }
                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    // Refresh scholarship list
                    queryClient.invalidateQueries(['applications', user.email]);

                    // Optionally: Navigate back to Myscholarships page
                    navigate('/dashboard/applications');

                    // Optional: show success message
                    Swal.fire('Payment Successful!', 'Your scholarship is now marked as paid.', 'success');
                }
            }
        }
        console.log('res from intent', res);




    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement>

                </CardElement>
                <button
                    className='p-2 btn btn-primary text-black border w-full'
                    type='submit' disabled={!stripe}>
                    Pay $ {amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;