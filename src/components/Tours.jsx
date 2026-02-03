import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toursData from "../data/tour.json";
import { Link } from "react-router-dom";

const Tours = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Get only 5 categories for recommended tours
  const displayedCategories = toursData.categories.slice(0, 5);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((prev) => (prev === 0 ? displayedCategories.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((prev) => (prev === displayedCategories.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Auto-slide effect - FIXED: using useRef to persist interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setActive((prev) => (prev === displayedCategories.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isTransitioning]); // Only depends on isTransitioning

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-12 md:pt-18 px-4 bg-[#fdf7f3] overflow-hidden"
    >
      {/* Main container with max-w-7xl */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-[#0b1c3d] pt-4 md:pt-6">
            Recommended Tours
          </h1>
        </div>

        {/* Coverflow Container with max-w-7xl constraint */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20
                       bg-white shadow-xl w-10 h-10 md:w-12 md:h-12 rounded-full
                       flex items-center justify-center
                       hover:bg-gray-900 hover:text-white transition z-20
                       disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous tour"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
                       bg-white shadow-xl w-10 h-10 md:w-12 md:h-12 rounded-full
                       flex items-center justify-center
                       hover:bg-gray-900 hover:text-white transition z-20
                       disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next tour"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </button>

          {/* INCREASED small screen height slightly, increased for large screens */}
          <div className="relative flex items-center justify-center h-[26rem] md:h-[28rem] lg:h-[36rem] xl:h-[40rem] overflow-visible">
            {displayedCategories.map((category, index) => {
              const offset = index - active;
              let displayOffset = offset;

              if (displayOffset < -2) displayOffset = displayedCategories.length + offset;
              if (displayOffset > 2) displayOffset = -displayedCategories.length + offset;

              const animationStyle = {
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translate(0,0)"
                  : displayOffset === 0
                  ? "translateY(-40px)"
                  : displayOffset < 0
                  ? "translateX(-40px)"
                  : "translateX(40px)",
                transition: "all 700ms ease-out",
                transitionDelay: `${Math.abs(displayOffset) * 120}ms`,
              };

              return (
                <div
                  key={category.id}
                  style={animationStyle}
                  className={`
                    absolute transition-all duration-700 ease-out cursor-pointer
                    ${displayOffset === 0 ? "z-30 scale-100" : ""}
                    ${displayOffset === -1 ? "z-20 scale-85 opacity-70 -translate-x-20 md:-translate-x-24 lg:-translate-x-64 xl:-translate-x-84" : ""}
                    ${displayOffset === 1 ? "z-20 scale-85 opacity-70 translate-x-20 md:translate-x-24 lg:translate-x-64 xl:translate-x-84" : ""}
                    ${displayOffset === -2 ? "z-10 scale-70 opacity-60 -translate-x-40 md:-translate-x-48 lg:-translate-x-96 xl:-translate-x-120" : ""}
                    ${displayOffset === 2 ? "z-10 scale-70 opacity-60 translate-x-40 md:translate-x-48 lg:translate-x-96 xl:translate-x-120" : ""}
                    ${Math.abs(displayOffset) > 2 ? "opacity-0 scale-50 hidden" : ""}
                  `}
                  onClick={() => window.location.href = `/tours/${category.slug}`}
                >
                  <div
                    className={`
                      relative rounded-2xl overflow-hidden transition-all duration-700 shadow-xl
                      ${displayOffset === 0 ? "shadow-2xl hover:shadow-3xl ring-2 ring-white/50 ring-offset-4 ring-offset-[#fdf7f3]" : "hover:shadow-xl"}
                      /* INCREASED small screen height slightly, dramatically increase for large screens */
                      ${displayOffset === 0 
                        ? "w-64 h-84 md:w-72 md:h-96 lg:w-[36rem] lg:h-[28rem] xl:w-[40rem] xl:h-[32rem]" 
                        : ""}
                      ${Math.abs(displayOffset) === 1 
                        ? "w-56 h-76 md:w-64 md:h-80 lg:w-72 lg:h-96 xl:w-80 xl:h-[28rem]" 
                        : ""}
                      ${Math.abs(displayOffset) === 2 
                        ? "w-48 h-68 md:w-56 md:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-96" 
                        : ""}
                    `}
                  >
                    {/* Image with overlay text */}
                    <div className="relative w-full h-full overflow-hidden group">
                      <img
                        src={category.image || "/images/default-tour.jpg"}
                        alt={category.name}
                        className={`w-full h-full object-cover transition-all duration-500 
                          ${displayOffset === 0 ? "group-hover:scale-105" : "group-hover:scale-102"}`}
                      />
                      
                      {/* Enhanced gradient overlay - stronger on center card */}
                      <div className={`absolute inset-0 transition-all duration-300
                        ${displayOffset === 0 
                          ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent" 
                          : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"}`}
                      />
                      
                      {/* Content overlay on image */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        {/* Duration Badge - more prominent on center */}
                        <div className={`mb-3 transition-all duration-300
                          ${displayOffset === 0 ? "scale-105" : "scale-95"}`}>
                          <span className={`inline-block backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                            ${displayOffset === 0 
                              ? "bg-white text-gray-900 shadow-lg" 
                              : "bg-white/80 text-gray-800"}`}>
                            {category.duration}
                          </span>
                        </div>
                        
                        {/* Category Name - larger and bolder on center */}
                        <h3 className={`font-serif font-semibold text-white transition-all duration-300
                          ${displayOffset === 0 
                            ? "text-2xl md:text-3xl lg:text-4xl" 
                            : "text-xl md:text-2xl"}`}>
                          {category.name}
                        </h3>
                      </div>

                      {/* Glow effect for center card */}
                      {displayOffset === 0 && (
                        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      )}
                    </div>

                    {/* Gradient overlays for side cards - darker to de-emphasize */}
                    {displayOffset !== 0 && displayOffset < 0 && (
                      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
                    )}
                    {displayOffset !== 0 && displayOffset > 0 && (
                      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
                    )}

                    <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300
                      ${displayOffset === 0 
                        ? "border-4 border-white/40" 
                        : "border-2 border-white/20"}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {displayedCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === index 
                    ? "bg-[#0b1c3d] w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={`Go to tour ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#6dc5f1] text-white
                     rounded-full font-medium hover:bg-[#0b1c3d] hover:text-[#6dc5f1] transition"
          >
            View All Tours
            <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Tours;