import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "What is ScholarshipHub?",
    answer:
      "ScholarshipHub is a platform designed to help students discover, apply, and track scholarships efficiently. It brings together resources, opportunities, and updates in one place."
  },
  {
    question: "Who can apply for scholarships listed on ScholarshipHub?",
    answer:
      "Scholarships are available for students of different levels—undergraduate, postgraduate, and research programs. Eligibility depends on the scholarship provider’s criteria."
  },
  {
    question: "How do I know if I am eligible for a scholarship?",
    answer:
      "Each scholarship listed on ScholarshipHub comes with detailed eligibility criteria such as academic qualifications, nationality, financial need, and field of study."
  },
  {
    question: "Does ScholarshipHub charge any fees?",
    answer:
      "No, ScholarshipHub is free to use. We aim to make scholarships accessible to everyone without charging any hidden fees."
  },
  {
    question: "Can I track my scholarship applications here?",
    answer:
      "Yes! ScholarshipHub provides a dashboard where you can manage and track your applications, deadlines, and required documents."
  },
  {
    question: "Are international scholarships also included?",
    answer:
      "Absolutely. ScholarshipHub features opportunities from global universities, NGOs, and foundations for students who wish to study abroad."
  },
  {
    question: "How often is the scholarship database updated?",
    answer:
      "Our team updates the scholarship listings regularly to ensure students always have access to the latest opportunities."
  },
  {
    question: "How do I stay informed about new scholarships?",
    answer:
      "You can subscribe to our newsletter or check the ScholarshipHub News section. We also share important updates on our Media and Communications page."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:my-10 px-5 md:px-5 md:rounded-2xl bg-gray-50" id="faq">
      <div className="w-full mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Find answers to the most common questions about ScholarshipHub.
        </motion.p>
      </div>

      <div className=" mx-auto">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <FaMinus className="text-gray-500" />
              ) : (
                <FaPlus className="text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="px-6 pb-4 text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
