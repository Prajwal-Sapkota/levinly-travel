import { useEffect, useRef } from "react";

const Mission = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            linesRef.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 140);
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#fcf6f2] pb-12 sm:pb-16 lg:pb-24 min-h-[600px] sm:min-h-[500px] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 w-full">
        <div className="flex justify-center items-center">
          <div
            ref={el => (linesRef.current[0] = el)}
            className="opacity-0 translate-y-6 transition-all duration-700 w-full"
          >
            <div className="relative bg-gradient-to-br from-white to-[#fdf7f3] p-6 sm:p-8 md:p-12 lg:p-18 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#eee2d8] shadow-lg sm:shadow-xl lg:shadow-2xl h-full min-h-[500px] sm:min-h-[450px] flex flex-col justify-center">
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 -left-3 sm:-left-4 lg:-left-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-[#fdf7f3] to-white rounded-lg sm:rounded-xl lg:rounded-2xl -rotate-12 shadow-lg sm:shadow-xl lg:shadow-xl" />
              <div className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 -right-3 sm:-right-4 lg:-right-6 w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-gradient-to-tr from-[#fdf7f3] to-white rounded-lg sm:rounded-xl lg:rounded-2xl rotate-12 shadow-lg sm:shadow-xl lg:shadow-xl" />

              <div className="relative z-10 pb-4 sm:pb-6 lg:pb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-gray-900 leading-tight flex items-center justify-center text-center">
                  Travel designed with purpose
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 lg:space-y-10 flex-grow">
                {[
                  "Levinly Travel exists to craft journeys that feel deeply personal — shaped by intention, guided by care, and rooted in respect for people and place.",
                  "We believe travel is not about collecting destinations, but about creating meaningful connections with cultures, landscapes, and stories.",
                  "Every experience we design is thoughtful, immersive, and unhurried — allowing you to explore the world not as a tourist, but as a welcomed guest.",
                  "Our mission is simple: fewer trips, crafted better — so every journey leaves a lasting imprint long after you return home."
                ].map((text, index) => (
                  <p
                    key={index}
                    ref={el => (linesRef.current[index + 1] = el)}
                    className={`opacity-0 translate-y-6 transition-all duration-700 ${index === 3
                      ? "text-base sm:text-lg md:text-xl font-serif italic text-gray-800"
                      : "text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
                      }`}
                  >
                    {text}
                  </p>
                ))}
              </div>
              <div
                ref={el => (linesRef.current[5] = el)}
                className="py-4 sm:py-6 lg:pt-8 opacity-0 translate-y-6 transition-all duration-700 flex justify-center text-center"
              >
                <div className="border-l-2 sm:border-l-3 lg:border-l-4 border-[#e6d5c3] pl-3 sm:pl-4 lg:pl-6">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif font-light text-[#0b1c3d] leading-snug">
                    “We don't design itineraries. We design the way a journey feels.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;