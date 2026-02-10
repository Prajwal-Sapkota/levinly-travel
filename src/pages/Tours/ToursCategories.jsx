import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import toursData from "../../data/tour.json";

const ToursCategories = () => {
  const [categories, setCategories] = useState([]);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (toursData?.categories) {
      setCategories(toursData.categories);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              // Stagger animation based on index
              setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
              }, index * 50);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe each card
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // Cleanup
    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [categories]);

  return (
    <section ref={containerRef} className="bg-[#fcf6f2] pb-16 md:pb-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-center py-8 md:py-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#1a365d] leading-tight text-center px-4">
            Explore Nepal <br className="hidden sm:block" />
            Through Experiences
          </h2>
        </div>

        {/* EDITORIAL LIST */}
        <div className="space-y-16 md:space-y-24">
          {categories.map((cat, index) => {
            const isEven = index % 2 !== 0;

            return (
              <div
                key={cat.id}
                ref={el => cardRefs.current[index] = el}
                className="group grid md:grid-cols-2 gap-10 md:gap-20 items-center"
                style={{
                  opacity: 0,
                  transform: isEven ? "translateX(-50px)" : "translateX(50px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease"
                }}
              >
                {/* IMAGE */}
                <div
                  className={`relative h-[400px] md:h-[520px] rounded-2xl md:rounded-3xl overflow-hidden ${
                    isEven ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
                </div>

                {/* CONTENT */}
                <div
                  className={`relative px-4 sm:px-0 ${
                    isEven ? "md:order-1" : ""
                  }`}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a365d] leading-tight">
                    {cat.name}
                  </h3>

                  <p className="pt-4 md:pt-6 text-[#4a5568] text-base sm:text-lg max-w-xl">
                    {cat.description}
                  </p>

                  <div className="pt-6 md:pt-10 flex items-center gap-4 md:gap-6">
                    <span className="text-xs sm:text-sm tracking-widest uppercase text-[#2c5aa0]">
                      {cat.subcategories?.length || 0} Experiences
                    </span>

                    <span className="h-px w-12 md:w-20 bg-[#a0aec0]" />
                  </div>

                  {/* CTA — HOVER REVEAL */}
                  <div className="pt-8 md:pt-12 opacity-100 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                    <Link
                      to={`/tours/${cat.slug || cat.id}`}
                      onClick={()=>{window.scrollTo(0,0);}}
                      className="inline-flex items-center gap-4 text-[#2c5aa0] text-base md:text-lg font-semibold hover:text-[#1e429f] transition-colors duration-300"
                    >
                      Discover Journey
                      <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2c5aa0] flex items-center justify-center text-white group-hover:bg-[#1e429f] transition-colors duration-300">
                        <FaArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToursCategories;