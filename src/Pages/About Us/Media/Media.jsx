import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaPodcast, FaAward, FaNewspaper, FaBullhorn } from "react-icons/fa";

const Media = () => {
  const newsItems = [
    {
      title: "Global Scholarships Expand Opportunities for Students",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      link: "https://www.timeshighereducation.com/student/advice/global-scholarships-expand-opportunities-students",
    },
    {
      title: "How Scholarships are Shaping Education Futures",
      img: "https://scholarshipscorner.website/wp-content/uploads/2025/08/EMU-Scholarships-for-International-Students-Study-in-North-Cyprus-1080x628.png",
      link: "https://scholarshipscorner.website/emu-scholarships-study-in-north-cyprus/",
    },
    {
      title: "Top International Scholarships for 2025",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      link: "https://scholarshipscorner.website/mitacs-globalink-research-internship/",
    },
  ];

  const podcasts = [
    {
      title: "Maximizing Your Scholarship Applications",
      link: "https://open.spotify.com/show/4XplF8R6E9B4T9L4n7h9Uo",
    },
    {
      title: "The Scholarship Roadmap Podcast",
      link: "https://podcasts.apple.com/us/podcast/the-scholarship-roadmap-podcast/id1524411991",
    },
    {
      title: "Financial Aid & Scholarships Insights",
      link: "https://podcasters.spotify.com/pod/show/scholarships",
    },
  ];

  const awards = [
    {
      title: "Best Student Support Initiative 2024",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Excellence in Education Award",
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="p-8">
      {/* News Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
          <FaNewspaper className="text-blue-600" /> News
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold dark:text-black text-lg">{item.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Podcasts Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-bold  flex items-center gap-2 mb-6">
          <FaPodcast className="text-green-600" /> Podcasts
        </h2>
        <ul className="space-y-4">
          {podcasts.map((podcast, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:text-black shadow-md p-4 rounded-xl hover:bg-gray-100"
            >
              <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                🎧 {podcast.title}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* ScholarshipHub Communications */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
          <FaBullhorn className="text-purple-600" /> ScholarshipHub Communications
        </h2>
        <Swiper spaceBetween={20} slidesPerView={1} autoplay={{ delay: 2500 }}>
          <SwiperSlide>
            <div className="p-6 bg-blue-50 rounded-2xl shadow">
              <p className="text-lg dark:text-black">
                📢 ScholarshipHub is proud to announce new collaborations with universities worldwide.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-6 bg-blue-50 rounded-2xl shadow">
              <p className="text-lg dark:text-black">
                🌍 Our platform now covers over 100+ international scholarships!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>

      {/* Awards Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
          <FaAward className="text-yellow-600" /> Awards
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              <img src={award.img} alt={award.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg dark:text-black">{award.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Media;
