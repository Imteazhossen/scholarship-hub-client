import React from 'react';
import { FaGoogleScholar } from 'react-icons/fa6';

const Logo = () => {
    return (
        <div>
            <FaGoogleScholar size={28} className="text-sky-600" />
            <span className="text-xl font-extrabold text-gray-800">
                Scholarship Hub
            </span>
        </div>
    );
};

export default Logo;