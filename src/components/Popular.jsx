import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import toursData from "../data/tour.json";

const Popular = () => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [popularTours, setPopularTours] = useState([]);

  // Scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  // Select random tours only once
  useEffect(() => {
    const selectedTours = [];
    toursData.categories.forEach(category => {
      if (category.subcategories && category.subcategories.length > 0) {
        const randomIndex = Math.floor(Math.random() * category.subcategories.length);
        const randomTour = category.subcategories[randomIndex];
        selectedTours.push({
          ...randomTour,
          categoryName: category.name,
          categoryIcon: category.icon,
          categoryColor: category.color
        });
      }
    });
    setPopularTours(selectedTours.slice(0, 8)); // Keep max 8 tours
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-16 md:pt-24 bg-[#f9f6f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#0b1c3d] pt-4 md:pt-6">
            Popular Tours
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTours.map((tour, index) => {
            const animationStyle = {
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translate(0,0)"
                : index % 8 === 0
                ? "translateX(-60px) translateY(-40px)"
                : index % 8 === 1
                ? "translateX(60px) translateY(-40px)"
                : index % 8 === 2
                ? "translateX(-60px) translateY(40px)"
                : index % 8 === 3
                ? "translateX(60px) translateY(40px)"
                : index % 8 === 4
                ? "translateX(-30px) translateY(-60px)"
                : index % 8 === 5
                ? "translateX(30px) translateY(-60px)"
                : index % 8 === 6
                ? "translateX(-30px) translateY(60px)"
                : "translateX(30px) translateY(60px)",
              transition: `all 700ms ease ${index * 150}ms`,
            };

            return (
              <div
                key={tour.id || index}
                className="group relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                style={animationStyle}
              >
                {/* Background Image */}
                <img
                  src={tour.images?.[0] || `/images/tour${index + 1}.jpg`}
                  alt={tour.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"></div>

                {/* Duration Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/70 text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <FaCalendarAlt className="text-xs" />
                  {tour.duration}
                </div>

                {/* Tour Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/70 sm:bg-white/60 backdrop-blur-md w-full rounded-t-2xl sm:rounded-t-3xl shadow-sm sm:shadow-md">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm line-clamp-2 mt-1">
                    {tour.description || ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#6dc5f1] text-white rounded-full text-sm sm:text-base font-medium hover:bg-[#0b1c3d] hover:text-[#6dc5f1] transition-all duration-300 shadow-md hover:shadow-lg">
            View All Tours
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Popular;