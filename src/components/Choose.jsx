"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaRoute,
  FaLeaf,
  FaSyncAlt,
  FaUserFriends,
  FaEye,
  FaHeart,
} from "react-icons/fa";

const Choose = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || animate) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        setAnimate(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animate]);

  const features = [
    {
      icon: <FaRoute />,
      title: "Exclusive Travel Plan",
      description:
        "Personalized itineraries crafted to match your travel style and dreams.",
    },
    {
      icon: <FaLeaf />,
      title: "Ethical Tourism",
      description:
        "We respect nature, culture, and local communities at every step.",
    },
    {
      icon: <FaSyncAlt />,
      title: "Total Flexibility",
      description:
        "Travel freely with adaptable routes and personalized pacing.",
    },
    {
      icon: <FaUserFriends />,
      title: "Experienced Team",
      description:
        "Guided by professionals with deep regional expertise.",
    },
    {
      icon: <FaEye />,
      title: "Trusted Supervision",
      description:
        "End-to-end coordination for a smooth and worry-free journey.",
    },
    {
      icon: <FaHeart />,
      title: "Travel Companions",
      description:
        "More than guides — we share moments and memories with you.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pb-12 bg-[#fcf6f2] overflow-hidden"
    >

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center pb-16">
          <h2 className="text-4xl font-serif text-[#0b1c3d]">
            Why Choose Us
          </h2>
          <p className="pt-4 text-gray-500 max-w-xl mx-auto">
            Designed for travelers who want more than just a destination
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-3xl p-8
                         bg-white/80 backdrop-blur
                         border border-white
                         shadow-md hover:shadow-2xl
                         transition-all duration-500"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate
                  ? "translateY(0)"
                  : `translateY(${30 + index * 6}px)`,
                transition: `all 600ms ease ${index * 90}ms`,
              }}
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-3xl
                              bg-gradient-to-br from-[#6dc5f1]/0 to-[#6dc5f1]/20
                              opacity-0 group-hover:opacity-100
                              transition duration-500 pointer-events-none" />

              {/* WOW Icon */}
              <div className="relative z-10 pb-6">
                {/* glow */}
                <div className="absolute inset-0 rounded-full
                                bg-[#6dc5f1]/30 blur-xl
                                opacity-0 group-hover:opacity-100
                                transition duration-500" />

                {/* ring */}
                <div className="relative w-16 h-16 rounded-full
                                border border-[#6dc5f1]/40
                                bg-white/70 backdrop-blur
                                flex items-center justify-center
                                text-[#0b1c3d] text-2xl
                                shadow-sm
                                group-hover:scale-110
                                group-hover:border-[#6dc5f1]
                                transition-all duration-500">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="relative z-10 text-xl font-semibold text-[#0b1c3d] pb-3">
                {feature.title}
              </h3>
              <p className="relative z-10 text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* bottom accent */}
              <div className="absolute bottom-0 left-8 right-8 h-[3px]
                              bg-gradient-to-r from-[#0b1c3d] to-[#6dc5f1]
                              scale-x-0 group-hover:scale-x-100
                              transition-transform duration-500
                              origin-left rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Choose;