import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMapPin,
  FiTrendingUp,
  FiClock,
  FiActivity,
} from "react-icons/fi";
import trekkingData from "../../data/trekking.json";

const TrekkingCategories = () => {
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -100px 0px",
      threshold: 0.1,
    };

    const observers = [];

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      }, observerOptions);

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="bg-[#fcf6f2] overflow-hidden">
      {/* INTRO */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-12 md:pb-20">
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[#1a365d] leading-tight text-center">
          Trekking Regions of Nepal
        </h1>
      </div>

      {/* REGIONS */}
      <div className="space-y-24 md:space-y-36 pb-20 md:pb-40">
        {trekkingData.regions.map((region, index) => {
          const isRight = index % 2 !== 0;
          const isVisible = visibleSections.includes(index);

          return (
            <div
              key={region.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="relative transition-all duration-1000 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(60px)",
              }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* IMAGE WRAPPER - Mobile: taller, Desktop: your original */}
                <div className="relative h-[85vh] min-h-[600px] md:h-[520px] lg:h-[600px] rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-xl md:shadow-2xl">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Mobile: Lighter overlay at top, Desktop: gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 md:bg-gradient-to-r md:from-black/70 md:via-black/40 md:to-transparent" />

                  {/* FLOATING CONTENT - Mobile: bottom, Desktop: centered */}
                  <div
                    className={`
                      absolute 
                      md:top-1/2 md:-translate-y-1/2
                      top-auto bottom-4 md:bottom-auto
                      ${
                        isRight 
                          ? "md:right-10 lg:right-16" 
                          : "md:left-10 lg:left-16"
                      }
                      left-4 right-4 md:left-auto md:right-auto
                      max-w-full md:max-w-md
                      bg-white/95 md:bg-white/60 
                      backdrop-blur-md md:backdrop-blur-xl
                      rounded-2xl md:rounded-[2rem]
                      p-6 md:p-8 lg:p-10
                      shadow-2xl md:shadow-xl
                      border border-white/40
                      transition-transform duration-500
                      ${isVisible ? "translate-y-0" : "translate-y-20"}
                    `}
                  >
                    {/* Mobile: Show only on small screens */}
                    <div className="md:hidden pb-4">
                      <div className="text-center">
                        <div className="inline-block px-4 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-white/40 shadow-sm text-sm font-medium text-[#1a365d] pb-2">
                          {region.name}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Show full region name */}
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a365d] hidden md:block">
                      {region.name}
                    </h2>

                    <p className="pt-3 md:pt-4 text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3 md:line-clamp-none">
                      {region.overview || region.description}
                    </p>

                    {/* INFO */}
                    <div className="pt-4 md:pt-6 grid grid-cols-2 gap-3 md:gap-4">
                      <Info 
                        icon={<FiTrendingUp size={14} className="md:w-auto md:h-auto" />} 
                        label="Altitude" 
                        value={region.altitudeRange} 
                      />
                      <Info 
                        icon={<FiClock size={14} className="md:w-auto md:h-auto" />} 
                        label="Duration" 
                        value={region.trekkingDays} 
                      />
                     
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/trekking/${region.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="group inline-flex items-center justify-center md:justify-start gap-3 md:gap-4 pt-5 md:pt-8 text-[#2c5aa0] font-semibold text-sm md:text-base w-full md:w-auto"
                    >
                      Explore Region
                      <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#2c5aa0] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <FiArrowRight size={16} className="md:w-auto md:h-auto" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 border border-gray/20 md:border-gray-100 shadow-sm">
    <div className="flex items-center gap-2 text-gray-500 text-xs pb-1">
      {icon}
      <span className="text-xs md:text-xs">{label}</span>
    </div>
    <div className="font-semibold text-[#1a365d] text-sm">
      {value || "—"}
    </div>
  </div>
);

export default TrekkingCategories;