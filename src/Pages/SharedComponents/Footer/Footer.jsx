import React from 'react';
import { FaFacebook, FaGithub, FaGoogleScholar, FaInstagram } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div>
            <footer className="rounded-2xl dark:text-black font-inter footer footer-horizontal footer-center bg-gradient-to-r from-pink-50 from-10% via-sky-100 via-30% to-emerald-50 to-90% p-10">
                <aside>
                    <FaGoogleScholar size={50} />
                    <p className="font-extrabold">
                        Scholarship Hub Ltd.
                        <br />
                        Providing reliable scholarships since 2025
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <Link
                            to="https://www.facebook.com/ImteazMahin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            <FaFacebook size={24} />
                        </Link>
                        <Link
                            to="https://github.com/Imteazhossen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:text-gray-900 transition"
                        >
                            <FaGithub size={24} />
                        </Link>
                        <Link
                            to="https://www.facebook.com/ImteazMahin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-700 transition"
                        >
                            <FaInstagram size={24} />
                        </Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;