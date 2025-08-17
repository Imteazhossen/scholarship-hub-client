// src/components/Webinars.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiHandSwipeLeft, PiHandSwipeRight } from "react-icons/pi";
import "swiper/css";

const webinars = [
    {
        title: "How to Apply for International Scholarships",
        date: "Aug 25, 2025",
        time: "3:00 PM - 4:00 PM",
        speaker: "Dr. Jane Smith",
        img: "https://www.sageeducation.ae/admin/blog/scholarship-application-form-foundation-concept.jpg",
        link: "https://www.sageeducation.ae/blog/tips-for-applying-for-a-scholarship-in-a-university",
    },
    {
        title: "Scholarship Application Tips & Tricks",
        date: "Sep 5, 2025",
        time: "5:00 PM - 6:00 PM",
        speaker: "John Doe",
        img: "http://www.studyabroad.pk/Images/newsimages/Tips-To-Improve-Study-Abroad.jpg",
        link: "https://www.studyabroad.pk/news-event/tips-to-improve-study-abroad-scholarship-application-19750",
    },
    {
        title: "Navigating Scholarship Deadlines",
        date: "Sep 15, 2025",
        time: "2:00 PM - 3:00 PM",
        speaker: "Lina Ahmed",
        img: "https://thescholarshipsystem.com/wp-content/uploads/2018/01/Pin-70-Here-Are-the-Months-With-the-Most-Scholarship-Deadlines-400x600.png",
        link: "https://thescholarshipsystem.com/blog-for-students-families/months-scholarship-deadlines/",
    },
];

const Webinars = () => {
    return (
        <section className="py-16 px-4 md:px-12 bg-gradient-to-r from-pink-50 via-sky-50 to-emerald-50 rounded-2xl">
            <motion.h2
                className="text-4xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                Upcoming Webinars
            </motion.h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Join our live webinars to learn how to find, apply, and secure scholarships effectively.
            </p>

            <Swiper spaceBetween={20} slidesPerView={1} breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}>
                {webinars.map((webinar, index) => (
                    <SwiperSlide key={index}>
                        <motion.a
                            href={webinar.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden block mb-6"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <img src={webinar.img} alt={webinar.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                                <div className="flex items-center gap-3 text-gray-600 mb-2">
                                    <FaCalendarAlt /> <span>{webinar.date} | {webinar.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FaChalkboardTeacher /> <span>{webinar.speaker}</span>
                                </div>
                            </div>
                        </motion.a>
                    </SwiperSlide>
                ))}
            </Swiper>
             <div className="flex justify-center items-center gap-10">
        <PiHandSwipeLeft  size={25} className="text-black lg:hidden "/><h1 className="mb-5 mt-3 lg:hidden text-center text-black text-2xl">Swipe</h1><PiHandSwipeRight  size={25} className="text-black lg:hidden "/>
      </div>
        </section>
    );
};

export default Webinars;
