import React from 'react';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import mitLogo from '../../assets/UniLogos/MIT-logo.png';
import stanfordLogo from '../../assets/UniLogos/Stanford.png';
import cambridgeLogo from '../../assets/UniLogos/Cambridge.png';
import oxfordLogo from '../../assets/UniLogos/oxford.png';

const partners = [
  {
    name: 'MIT',
    logo: mitLogo,
    location: 'Cambridge, MA, USA',
    website: 'https://web.mit.edu',
  },
  {
    name: 'Stanford',
    logo: stanfordLogo,
    location: 'Stanford, CA, USA',
    website: 'https://www.stanford.edu',
  },
  {
    name: 'Cambridge',
    logo: cambridgeLogo,
    location: 'Cambridge, UK',
    website: 'https://www.cam.ac.uk',
  },
  {
    name: 'Oxford',
    logo: oxfordLogo,
    location: 'Oxford, UK',
    website: 'https://www.ox.ac.uk',
  },
];

export default function PartnerUniversities() {
  return (
    <section className="py-12 sm:my-10 rounded-2xl bg-gray-50">
      <h2 className="text-4xl  font-bold text-center mb-4 dark:text-black">
        Our Partner Universities
      </h2>
      <p className="text-center px-4 text-gray-600 mb-8">
        We collaborate with the world's top institutions to bring you premier scholarship opportunities.
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {partners.map((uni) => (
          <div
            key={uni.name}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition duration-300 transform hover:scale-110"
          >
            <img
              src={uni.logo}
              alt={uni.name}
              className="h-20 mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">{uni.name}</h3>
            <p className="flex items-center text-gray-500 text-sm mb-4">
              <FaMapMarkerAlt className="mr-1" /> {uni.location}
            </p>
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-500 hover:underline text-sm"
            >
              Visit Website <FaExternalLinkAlt className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
