import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Video = () => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 } // Lower threshold for mobile
    );
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const thumbnail = '/images/hero4.jpg';
  const vimeoUrl = 'https://vimeo.com/1034445205';

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-32 px-4 sm:px-6"
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Keep fixed for desktop
      }}
    >
      {/* Overlay - slightly darker for mobile readability */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/25"></div>

      {/* Video Card */}
      <div className="relative flex justify-center items-center z-10">
        <Link
          to={vimeoUrl}
          target="_blank"
          rel="noopener noreferrer"
          ref={cardRef}
          className={`relative w-full max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl transition-all duration-700 transform ${
            isVisible ? 'scale-100 md:scale-105 translate-y-0 opacity-100' : 'scale-95 translate-y-6 md:translate-y-10 opacity-0'
          }`}
        >
          {/* Video Card Thumbnail - Responsive height */}
          <img
            src={thumbnail}
            alt="Kailash Manasarovar Yatra"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700"
          />

          {/* Glass Overlay - Responsive text */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-sm flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold md:font-extrabold drop-shadow-xl">
              Kailash Manasarovar
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl mt-1 md:mt-2 drop-shadow-lg">
              Spiritual Journey to the Himalayas
            </p>
          </div>

          {/* Subtle Center Play Icon - Responsive size */}
          <FaPlay
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 pointer-events-none transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Corner Badge - Responsive */}
          <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold">
            <FaPlay className="w-2 h-2 sm:w-3 sm:h-3" />
            <span>Video</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Video;