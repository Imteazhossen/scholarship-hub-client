// src/components/Footer.jsx
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaGoogleScholar,
  FaInstagram,
} from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";


const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="rounded-t-2xl dark:text-black font-inter bg-gradient-to-r from-pink-50 via-sky-100 to-emerald-50 p-8 shadow-inner">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo & description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <FaGoogleScholar size={50} className="text-sky-600 mb-2" />
          <p className="font-extrabold text-gray-800">
            Scholarship Hub Ltd.
            <br />
            Providing reliable scholarships since 2025
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Copyright © {new Date().getFullYear()} – All rights reserved
          </p>
          <p className="text-xs text-gray-500">
            Developed By <span className="font-semibold">Md. Imteaz Hossen</span>
          </p>
        </div>

        {/* Footer navigation links */}
        <nav className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-gray-800 mb-2">Quick Links</h4>
          <ul className="space-y-2 text-gray-600 text-center md:text-left">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 font-bold border-b-2 border-sky-500"
                    : "hover:text-sky-500 transition"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allScholarships"
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 font-bold border-b-2 border-sky-500"
                    : "hover:text-sky-500 transition"
                }
              >
                All Scholarships
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutUs"
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 font-bold border-b-2 border-sky-500"
                    : "hover:text-sky-500 transition"
                }
              >
                About Us
              </NavLink>
            </li>

            {/* Show Media + Dashboard only if logged in */}
            {user && (
              <>
                <li>
                  <NavLink
                    to="/media"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 font-bold border-b-2 border-sky-500"
                        : "hover:text-sky-500 transition"
                    }
                  >
                    Media
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-600 font-bold border-b-2 border-sky-500"
                        : "hover:text-sky-500 transition"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Social icons */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-bold text-gray-800 mb-2">Follow Us</h4>
          <div className="flex gap-4">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
