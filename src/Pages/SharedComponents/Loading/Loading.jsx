import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center 
                    bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 
                    bg-opacity-90 z-50">
            <div className="flex flex-col items-center space-y-4">
                {/* DaisyUI dot spinner, sized large, tinted sky-500 */}
                <span className="loading loading-dots loading-lg text-sky-500"></span>
                <p className="text-gray-700 font-semibold text-lg animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}
