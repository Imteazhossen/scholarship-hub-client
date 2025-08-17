import React from 'react';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Md Imteaz Hossen',
    role: 'M.Sc. in Computer Science',
    comment:
      'This platform made finding scholarships effortless. I secured my funding within days!',
    avatar: 'https://i.ibb.co/wrY5SgnS/mahin.jpg',
    rating: 5,
  },
  {
    name: 'Jean Jordan',
    role: 'B.A. in Economics',
    comment:
      'The moderator feedback system is fantastic—kept me on track throughout my application.',
    avatar: 'https://i.ibb.co/Cpx0GKnh/looking-side-pleased-young-pretty-girl-holding-folders.jpg',
    rating: 4,
  },
  {
    name: 'Lina Ahmed',
    role: 'Diploma in Engineering',
    comment:
      'I love the real‑time updates. Applying was super smooth, and support was always a click away.',
    avatar: 'https://i.ibb.co/8gR5wPM5/international-day-education-celebration.jpg',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 mb-10 rounded-2xl bg-gradient-to-r from-pink-50 to-emerald-50">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-black">Student Testimonials</h2>
      <p className="text-center px-4 text-gray-600 mb-12">
        Hear what our scholars have to say about their experience.
      </p>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-4">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="card dark:bg-sky-50 bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="avatar">
                <div className="w-24 h-24  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={t.avatar} alt={t.name} />
                </div>
              </div>
            </div>

            {/* Name, Role & Rating */}
            <div className="mb-4 text-center">
              <div className="flex justify-center mb-1 text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className={i < t.rating ? '' : 'opacity-40'} />
                  ))}
              </div>
              <h3 className="text-xl font-semibold dark:text-black">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>

            {/* Comment with quote icons */}
            <p className="text-gray-700 italic relative pl-8 pr-8">
              <FaQuoteLeft className="absolute left-2  text-2xl text-gray-300" />
              {t.comment}
              <FaQuoteRight className="absolute right-4 bottom-1 text-2xl text-gray-300" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
