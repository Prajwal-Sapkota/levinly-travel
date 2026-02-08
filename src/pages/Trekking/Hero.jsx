import { useEffect, useRef } from "react";
import { FiArrowRight, FiStar, FiMap, FiFlag, FiTrendingUp } from "react-icons/fi";

const Hero = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.opacity = "0";
      textRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        textRef.current.style.transition = "all 0.8s ease";
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }, 200);
    }

    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      imageRef.current.style.transform = "scale(0.95)";
      setTimeout(() => {
        imageRef.current.style.transition = "all 0.8s ease 0.3s";
        imageRef.current.style.opacity = "1";
        imageRef.current.style.transform = "scale(1)";
      }, 400);
    }
  }, []);

  return (
    <section className="relative bg-[#fdf7f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-4 ">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* CONTENT */}
          <div ref={textRef} className="order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-tight text-gray-900 pb-4 sm:pb-6">
              Conquer The Himalayan Trails
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pb-4 sm:pb-6">
              Experience the ultimate adventure on legendary trails like Everest Base Camp, 
              Annapurna Circuit, and Langtang Valley. Our expertly guided treks offer 
              breathtaking vistas, cultural immersion, and memories that last a lifetime.
            </p>

            <button className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 text-sm sm:text-base pb-6 sm:pb-8">
              Explore Trekking Routes
              <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trekking Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg border border-[#eee2d8]">
                <div className="flex justify-center pb-1 sm:pb-2">
                  <FiMap className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c5aa0]" />
                </div>
                <div className="text-lg sm:text-xl font-serif font-bold text-gray-800">15+</div>
                <div className="text-xs sm:text-sm text-gray-600">Trek Routes</div>
              </div>

              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg border border-[#eee2d8]">
                <div className="flex justify-center pb-1 sm:pb-2">
                  <FiFlag className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c5aa0]" />
                </div>
                <div className="text-lg sm:text-xl font-serif font-bold text-gray-800">5,500m+</div>
                <div className="text-xs sm:text-sm text-gray-600">Highest Altitude</div>
              </div>

              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg border border-[#eee2d8]">
                <div className="flex justify-center pb-1 sm:pb-2">
                  <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c5aa0]" />
                </div>
                <div className="text-lg sm:text-xl font-serif font-bold text-gray-800">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -right-2 sm:-right-3 lg:-right-4 -top-2 sm:-top-3 lg:-top-4 w-full h-full bg-[#eee2d8] rounded-lg" />
              
              <div 
                ref={imageRef}
                className="relative rounded-lg overflow-hidden shadow-lg border border-[#eee2d8]"
              >
                <img
                  src="/images/trekkinghero.avif"
                  alt="Trekking in the Himalayas"
                  className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Stats badge */}
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-[#eee2d8]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <div>
                    <div className="font-serif font-bold text-gray-800 text-sm sm:text-base">Expert Guides</div>
                    <div className="text-xs text-gray-500">Certified & Local</div>
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