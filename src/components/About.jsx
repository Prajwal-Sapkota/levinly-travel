import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const About = () => {
  const imageRefs = useRef([]);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    // Scroll rotation for images - exact same effect as before
    const updateRotation = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.1), 1);

      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        const startAngle = -12 - i * 3;
        img.style.transform = `rotate(${startAngle * (1 - progress)}deg)`;
      });

      ticking.current = false;
    };

    // Check if section is in viewport
    const isSectionInView = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      return (
        rect.top < window.innerHeight * 0.8 && 
        rect.bottom > 0
      );
    };

    const handleScroll = () => {
      if (!ticking.current && isSectionInView()) {
        window.requestAnimationFrame(updateRotation);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation on mount - exact same as before
  useEffect(() => {
    const [img1, img2] = imageRefs.current;
    const text = textRef.current;

    if (img1 && img2 && text) {
      // Initial positions
      img1.style.transform = "translateX(-200px) rotate(-12deg)";
      img1.style.opacity = "0";
      img2.style.transform = "translateY(-200px) rotate(-15deg)";
      img2.style.opacity = "0";
      text.style.transform = "translateY(50px)";
      text.style.opacity = "0";

      // Animate in after short delay
      setTimeout(() => {
        img1.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        img1.style.transform = "translateX(0) rotate(-12deg)";
        img1.style.opacity = "1";

        img2.style.transition = "transform 1s ease-out, opacity 1s ease-out 0.2s";
        img2.style.transform = "translateY(0) rotate(-15deg)";
        img2.style.opacity = "1";

        text.style.transition = "transform 1s ease-out, opacity 1s ease-out 0.4s";
        text.style.transform = "translateY(0)";
        text.style.opacity = "1";
      }, 100);
    }
  }, []);

  const images = [
    { src: "about1.webp", alt: "Travel experience" },
    { src: "about2.jpg", alt: "Travel destination" },
  ];

  return (
    <section ref={sectionRef} className="bg-[#fcf6f2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">

          {/* LEFT – SOFT ELEGANT TEXT CARD */}
          <div ref={textRef} className="order-2 lg:order-1">
            <div className="bg-white p-12 lg:p-16 rounded-3xl border border-[#E6DED6] shadow-sm">
              {/* Accent Line */}
              <div className="w-20 h-[2px] bg-[#083A8F] mb-6"></div>

              <h2 className="text-4xl sm:text-5xl font-semibold text-[#1F2933] leading-tight mb-6">
                Experience Travel
                <br />
                <span className="text-[#1F2933]">Like Never Before</span>
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-lg text-[#6B7280] leading-relaxed">
                  Our mission is to craft unforgettable travel experiences by providing 
                  personalized and immersive tours to the world's most stunning destinations. 
                  With a passion for exploration and a commitment to exceptional service, 
                  we ensure every journey with us is unique and memorable.
                </p>
                <p className="text-lg text-[#6B7280] leading-relaxed">
                  Join us and discover new horizons, create lasting memories, and 
                  experience travel like never before.
                </p>
              </div>

              <button
                className="
                  inline-flex items-center gap-3
                  text-[#112152]
                  font-medium
                  group
                  hover:text-[#083A8F]
                  transition-colors duration-300
                "
              >
                Learn More About Us
                <span className="transition-transform group-hover:translate-x-1">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT – IMAGE PART (EXACT LIKE HERO) */}
          <div className="relative order-1 lg:order-2">
            <div className="relative flex items-center justify-center lg:justify-end pt-32 lg:pt-44">
              <div className="relative w-full max-w-lg lg:max-w-xl h-[420px] sm:h-[520px] lg:h-[700px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4DBA]/5 via-transparent to-[#0B4DBA]/3 rounded-[2.5rem] blur-xl"></div>

                {/* Image 1 */}
                <div
                  ref={(el) => (imageRefs.current[0] = el)}
                  className="absolute -top-8 left-0 z-30 rounded-2xl overflow-hidden border-4 border-white shadow-2xl w-[300px] sm:w-[360px] lg:w-[420px] h-[320px] sm:h-[360px] lg:h-[420px]"
                  style={{ transform: "rotate(-12deg)" }}
                >
                  <img
                    src={`/images/${images[0].src}`}
                    alt={images[0].alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Image 2 */}
                <div
                  ref={(el) => (imageRefs.current[1] = el)}
                  className="absolute top-36 -right-1 z-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl w-[300px] sm:w-[360px] lg:w-[380px] h-[320px] sm:h-[360px] lg:h-[420px]"
                  style={{ transform: "rotate(-15deg)" }}
                >
                  <img
                    src={`/images/${images[1].src}`}
                    alt={images[1].alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    
                    width="817"
                    height="546"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;