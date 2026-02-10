
import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import toursData from "../data/tour.json";
import { Link } from "react-router-dom";

const Popular = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tours, setTours] = useState([]);

  /* reveal on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* random tours once */
  useEffect(() => {
    const picked = [];
    toursData.categories.forEach((cat) => {
      if (cat.subcategories?.length) {
        const randomTour = cat.subcategories[
          Math.floor(Math.random() * cat.subcategories.length)
        ];
        // Add the region slug to each tour for routing
        randomTour.regionSlug = cat.slug;
        picked.push(randomTour);
      }
    });
    setTours(picked.slice(0, 8));
  }, []);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-18 bg-[#fcf6f2] overflow-hidden"
    >

      <div className="relative max-w-7xl mx-auto px-6">
        {/* heading */}
        <div className="text-center pb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0b1c3d]">
            Popular Tours
          </h2>
          
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((tour, i) => (
            <Link
              key={i}
              to={`/tours/${tour.regionSlug}/${tour.slug}`}
              onClick={()=> { handleClick(); window.scrollTo(0,0);}}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0)"
                  : "translateY(60px)",
                transition: `all 900ms ease ${i * 120}ms`,
              }}
              className="group relative h-[380px] rounded-[28px]
                         overflow-hidden
                         [perspective:1200px] block"
            >
              {/* glow border */}
              <div
                className="absolute inset-0 rounded-[28px]
                           bg-gradient-to-tr from-[#6dc5f1]/60 to-transparent
                           opacity-0 group-hover:opacity-100
                           transition duration-700 blur-xl"
              />

              {/* main card */}
              <div
                className="relative h-full w-full rounded-[28px]
                           overflow-hidden
                           bg-black
                           transition-transform duration-700
                           group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_scale(1.03)]"
              >
                {/* image */}
                <img
                  src={tour.images?.[0] || `/images/tour${i + 1}.jpg`}
                  alt={tour.name}
                  className="absolute inset-0 w-full h-full object-cover
                             scale-110 group-hover:scale-125
                             transition-transform duration-[1500ms]"
                />

                {/* cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                {/* light sweep */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                             transition duration-700
                             bg-gradient-to-r from-transparent via-white/20 to-transparent
                             -translate-x-full group-hover:translate-x-full"
                />

                {/* duration badge */}
                <div
                  className="absolute top-5 right-5
                             bg-white/20 backdrop-blur-md
                             border border-white/20
                             text-white text-xs font-semibold
                             px-3 py-1.5 rounded-full
                             flex items-center gap-1"
                >
                  <FaCalendarAlt />
                  {tour.duration}
                </div>

                {/* info glass */}
                <div
                  className="absolute bottom-0 left-0 right-0
                             p-6
                             bg-white/75 backdrop-blur-xl
                             rounded-t-[28px]
                             translate-y-4 group-hover:translate-y-0
                             transition-all duration-700"
                >
                  <h3 className="text-lg font-bold text-[#0b1c3d] line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-sm text-gray-700 pt-1 line-clamp-2">
                    {tour.description || ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-20">
          <Link
            to="/tours"
            onClick={()=> {handleClick(); window.scrollTo(0,0);}}
            className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#6dc5f1] text-[#0b1c3d]
             
             hover:bg-[#0b1c3d] hover:text-white text-sm sm:text-base md:text-lg rounded-full font-medium  transition-all duration-300 shadow-md md:shadow-lg hover:shadow-xl"
          >
            Explore All Tours
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Popular;