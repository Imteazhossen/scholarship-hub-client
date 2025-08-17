// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import {
    FaUsers,
    FaTrophy,
    FaHandshake,
    FaRocket,
    FaShieldAlt,
    FaBolt,
    FaClock,
    FaDatabase,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

// -------------------- Mock Data --------------------
const achievements = [
    {
        icon: <FaTrophy className="text-yellow-500 text-3xl" />,
        label: "Scholarships Awarded",
        value: "3,200+",
    },
    {
        icon: <FaUsers className="text-sky-500 text-3xl" />,
        label: "Active Students",
        value: "15,000+",
    },
    {
        icon: <FaHandshake className="text-emerald-500 text-3xl" />,
        label: "University Partners",
        value: "120+",
    },
    {
        icon: <FaRocket className="text-pink-500 text-3xl" />,
        label: "Monthly Applications",
        value: "8,500+",
    },
];

const team = [
    {
        name: "Md Imteaz Hossen",
        role: "Founder & Lead Engineer",
        img: "https://i.ibb.co/wrY5SgnS/mahin.jpg",
        blurb:
            "Focuses on product vision and scalable architecture for student success.",
    },
    {
        name: "Jean Jordan",
        role: "Community & Partnerships",
        img: "https://i.ibb.co/Cpx0GKnh/looking-side-pleased-young-pretty-girl-holding-folders.jpg",
        blurb:
            "Builds trusted relationships with universities and sponsors worldwide.",
    },
    {
        name: "Lina Ahmed",
        role: "UX & Support Lead",
        img: "https://i.ibb.co/8gR5wPM5/international-day-education-celebration.jpg",
        blurb:
            "Drives a friendly experience and fast support for every student.",
    },
];

const highlights = [
    {
        title: "Smart Match Engine",
        desc:
            "We match students to the right scholarships using clear filters and tags.",
        icon: <FaDatabase className="text-sky-600 text-2xl" />,
    },
    {
        title: "Real-time Updates",
        desc:
            "Get instant changes on deadlines, status, and new opportunities.",
        icon: <FaClock className="text-emerald-600 text-2xl" />,
    },
    {
        title: "Moderator Feedback",
        desc:
            "Helpful comments on your application draft so you can improve fast.",
        icon: <FaBolt className="text-pink-600 text-2xl" />,
    },
    {
        title: "Secure Authentication",
        desc:
            "Protected login and data handling to keep your profile safe.",
        icon: <FaShieldAlt className="text-indigo-600 text-2xl" />,
    },
];

// -------------------- Motion Helpers --------------------
const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const cardHover =
    "transition ease-in-out duration-300 hover:scale-[1.02] hover:shadow-xl";

export default function AboutUs() {
    return (
        <div className="min-h-screen md:my-12 my-5 rounded-2xl bg-gradient-to-r from-pink-50 via-sky-50 to-emerald-50">
            {/* Header / Hero */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h1 className="text-3xl md:text-5xl  font-extrabold text-gray-800">
                        About <span className="text-sky-600">Scholarship Hub</span>
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        We help students find, apply, and win scholarships with ease. Our
                        platform focuses on clarity, speed, and real support so you can aim
                        higher with confidence.
                    </p>
                </motion.div>
            </section>

            {/* Vision / Mission / Goal */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className={`bg-white rounded-2xl p-6 shadow-md ${cardHover}`}
                    >
                        <h3 className="text-xl font-bold text-gray-800">Vision</h3>
                        <p className="mt-2 text-gray-600">
                            A world where every student can afford quality education and build
                            a strong future, no matter their background.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className={`bg-white rounded-2xl p-6 shadow-md ${cardHover}`}
                    >
                        <h3 className="text-xl font-bold text-gray-800">Mission</h3>
                        <p className="mt-2 text-gray-600">
                            Make scholarship search and application simple, transparent, and
                            fast through a friendly and secure platform.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className={`bg-white rounded-2xl p-6 shadow-md ${cardHover}`}
                    >
                        <h3 className="text-xl font-bold text-gray-800">Goal</h3>
                        <p className="mt-2 text-gray-600">
                            Help 1M+ students find the right funding and reduce financial
                            stress so they can focus on learning and growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Achievements / Stats */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                >
                    Our Achievements
                </motion.h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {achievements.map((a, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className={`bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 ${cardHover}`}
                        >
                            <div>{a.icon}</div>
                            <div>
                                <div className="text-2xl font-extrabold text-gray-900 leading-none">
                                    {a.value}
                                </div>
                                <div className="text-gray-600 text-sm">{a.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Project Highlights */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                >
                    What Makes Scholarship Hub Special
                </motion.h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((h, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className={`bg-white rounded-2xl p-6 shadow-md ${cardHover}`}
                        >
                            <div className="flex items-center gap-3">
                                {h.icon}
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {h.title}
                                </h3>
                            </div>
                            <p className="mt-2 text-gray-600">{h.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team / Employees - Swiper */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                >
                    Meet Our Team
                </motion.h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-8 "
                >
                    {team.map((m, idx) => (
                        <SwiperSlide key={idx}>
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className={`bg-white rounded-2xl p-6 my-5 shadow-md h-full ${cardHover}`}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-28 h-28 rounded-full overflow-hidden ring ring-sky-200 ring-offset-2 mb-4">
                                        <img
                                            src={m.img}
                                            alt={m.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {m.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{m.role}</p>
                                    <p className="mt-3 text-gray-600">{m.blurb}</p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className={`bg-white rounded-2xl p-8 shadow-md text-center ${cardHover}`}
                >
                    <h3 className="text-2xl font-bold text-gray-800">
                        Join Our Scholar Community
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Start your journey today. Find scholarships that fit you, and apply
                        with confidence.
                    </p>
                    <Link to='/login'> <button className="mt-4 btn bg-sky-500 hover:bg-sky-600 hover:scale-110 transition ease-in-out duration-300 text-white rounded-full px-6">
                        Get Started
                    </button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
