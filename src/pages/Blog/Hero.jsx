import { useEffect, useRef } from "react";
import { FiBookOpen } from "react-icons/fi";

const Hero = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.opacity = "0";
      textRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        textRef.current.style.transition = "all 0.8s ease 0.2s";
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }, 200);
    }

    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      imageRef.current.style.transform = "translateX(20px)";
      setTimeout(() => {
        imageRef.current.style.transition = "all 0.8s ease 0.4s";
        imageRef.current.style.opacity = "1";
        imageRef.current.style.transform = "translateX(0)";
      }, 400);
    }

    if (badgeRef.current) {
      badgeRef.current.style.opacity = "0";
      badgeRef.current.style.transform = "scale(0.8)";
      setTimeout(() => {
        badgeRef.current.style.transition = "all 0.6s ease 0.8s";
        badgeRef.current.style.opacity = "1";
        badgeRef.current.style.transform = "scale(1)";
      }, 800);
    }
  }, []);

  return (
    <section className="relative bg-[#fcf6f2] overflow-hidden">
      {/* Soft background glow - Hidden on mobile */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#ede1d8] rounded-full -translate-y-48 translate-x-48" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 lg:py-24 xl:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          
          {/* LEFT TEXT - Mobile first */}
          <div ref={textRef} className="order-2 lg:order-1 lg:pl-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-gray-900 pb-4 sm:pb-6 leading-tight">
              Stories That Inspire Your <br className="hidden sm:block" /> Next Journey
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pb-6 sm:pb-8 max-w-lg">
              Discover authentic travel experiences, cultural insights, and practical 
              guides from explorers around the world. Each story is a window into 
              a new adventure.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gray-300 to-transparent pb-6 sm:pb-8" />
          </div>

          {/* RIGHT IMAGE - Mobile first */}
          <div className="relative order-1 lg:order-2">
            {/* Background layers - Hidden on mobile */}
            <div className="absolute -right-2 sm:-right-3 -top-2 sm:-top-3 w-full h-full rounded-lg sm:rounded-xl hidden sm:block">
              <div className="absolute inset-0 bg-[#ede1d8] rounded-lg sm:rounded-xl transform opacity-90" />
            </div>

            {/* Main image */}
            <div 
              ref={imageRef}
              className="relative rounded-lg overflow-hidden shadow-lg sm:shadow-xl"
            >
              {/* Borders - Hidden on mobile */}
              <div className="absolute inset-0 border-2 border-white/50 rounded-lg pointer-events-none hidden sm:block" />
              <div className="absolute inset-4 border border-white/30 rounded pointer-events-none hidden sm:block" />

              {/* Image */}
              <div className="relative h-64 sm:h-80 lg:h-[400px] xl:h-[500px] overflow-hidden">
                <img
                  src="/images/blogshero.jpg"
                  alt="Travel stories and blog content"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating stats badge - Mobile responsive */}
            <div ref={badgeRef} className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 z-10">
              <div className="relative bg-white p-3 sm:p-4 lg:p-5 rounded-md sm:rounded-lg shadow-md sm:shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="p-2 sm:p-3 bg-[#ede1d8] rounded-md sm:rounded-lg">
                    <FiBookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-gray-900 leading-none">156+</div>
                    <div className="text-xs sm:text-sm text-gray-500 pt-0.5 sm:pt-1">Curated Stories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;