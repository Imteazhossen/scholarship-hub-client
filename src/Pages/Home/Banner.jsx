import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImage1 from '../../assets/BannerImages/bannerImage1.jpg';
import bannerImage2 from '../../assets/BannerImages/bannerImage2.jpg';
import bannerImage3 from '../../assets/BannerImages/bannerImage3.jpg';

const slideTexts = [
  "Unlock your potential with scholarships that help you grow academically and personally.",
  "Explore new opportunities and expand your horizons. Scholarships give you freedom to achieve.",
  "Dream bigger and achieve more. With the right support, you can turn ambitions into reality."
];
const Banner = () => {
  return (
    <div className="rounded-xl sm:rounded-2xl md:my-12 my-5 overflow-hidden relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        renderIndicator={() => null}
      >
        {[bannerImage1, bannerImage2, bannerImage3].map((src, idx) => (
          <div key={idx} className="h-64 md:h-[500px] relative">
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              className="h-full w-full object-cover"
            />
            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4">
              <h2 className="text-white text-base md:text-5xl font-bold text-center w-4/5">
                {slideTexts[idx]}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
