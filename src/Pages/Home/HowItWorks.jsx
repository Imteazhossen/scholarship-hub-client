// src/components/HowItWorks.jsx
import React from "react";
import { FaUserPlus, FaSearch, FaFileAlt, FaClipboardCheck, FaDollarSign, FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Register on Website",
    desc: "Create your account to start exploring scholarships.",
    icon: <FaUserPlus size={28} className="text-sky-500" />,
  },
  {
    title: "Find Desired Scholarship",
    desc: "Search and filter scholarships that match your profile.",
    icon: <FaSearch size={28} className="text-green-500" />,
  },
  {
    title: "Apply for Scholarship",
    desc: "Select the scholarship you want to apply for and start your application.",
    icon: <FaFileAlt size={28} className="text-purple-500" />,
  },
  {
    title: "Fill Application Form",
    desc: "Complete the scholarship application form with required details.",
    icon: <FaClipboardCheck size={28} className="text-yellow-500" />,
  },
  {
    title: "Complete Payment",
    desc: "Pay any required application fees securely through our platform.",
    icon: <FaDollarSign size={28} className="text-pink-500" />,
  },
  {
    title: "Wait for Feedback",
    desc: "Track your application status and receive timely updates.",
    icon: <FaRegSmile size={28} className="text-emerald-500" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16  md:rounded-2xl md:my-10 bg-gradient-to-r from-pink-50 via-sky-50 to-emerald-50 rounded-2xl px-4 md:px-12">
      <motion.h2
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        How It Works
      </motion.h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Follow these simple steps to find and apply for scholarships with ease. ScholarshipHub makes the process smooth and efficient for students worldwide.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
