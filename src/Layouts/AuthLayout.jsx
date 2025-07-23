import Lottie from 'lottie-react';
import React from 'react';
import { Outlet } from 'react-router';
import loginAnimation from '../../src/assets/lotties/Registration.json'


export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Animation Panel */}
        <div className="hidden md:pl-5 lg:block lg:w-1/2 bg-indigo-50">
          <Lottie 
            animationData={loginAnimation} 
            loop={true} 
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Panel */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Join Us Now!
          </h2>
          <div className="bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
