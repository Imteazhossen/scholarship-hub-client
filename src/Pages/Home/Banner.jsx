import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImage1 from '../../assets/BannerImages/bannerImage1.png';
import bannerImage2 from '../../assets/BannerImages/bannerImage2.png';
import bannerImage3 from '../../assets/BannerImages/bannerImage3.png';

const Banner = () => {
  return (
    // set whatever height you like here (h-48 = 12rem = 192px, h-64 = 16rem = 256px, etc.)
    <div className="rounded-2xl my-12 overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        // remove margin on the legend if you want more space
        renderIndicator={() => null}
      >
        {[bannerImage1, bannerImage2, bannerImage3].map((src, idx) => (
          <div key={idx} className="h-full">
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
