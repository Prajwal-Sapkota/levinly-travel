import { useEffect, useRef } from "react";
import { FiCheckCircle, FiArrowRight, FiStar, FiHeart, FiCompass } from "react-icons/fi";

const Content = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            textRefs.current.forEach((text, index) => {
              if (text) {
                setTimeout(() => {
                  text.style.opacity = "1";
                  text.style.transform = "translateY(0)";
                }, index * 200);
              }
            });

            cardRefs.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0) scale(1)";
                }, index * 300 + 400);
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#fcf6f2] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcf6f2] via-[#fdf7f3]/20 to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-32">
        {/* Header Section */}
        <div className="text-center pb-12 sm:pb-16 lg:pb-20">
          <div
            ref={el => textRefs.current[0] = el}
            className="opacity-0 transform translate-y-8 transition-all duration-700"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-gray-900 pb-4 sm:pb-6 lg:pb-8">
              Where Every Journey<br />
              Tells Your Story
            </h2>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Begin the unforgettable journey with us, where adventure intertwines seamlessly
              with cultural exploration! At Levinly Travel, we specialize in crafting personalized
              travel experiences that are as unique as you are.
            </p>
          </div>
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 pb-12 sm:pb-16 lg:pb-20">
          {/* Card 1: Excellence Card */}
          <div
            ref={el => cardRefs.current[0] = el}
            className="relative group opacity-0 transform translate-y-8 scale-95 transition-all duration-700"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="relative bg-gradient-to-b from-white to-[#fdf7f3] border border-[#eee2d8] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 h-full group-hover:shadow-xl lg:group-hover:shadow-2xl transition-all duration-500">
              {/* Card header with icon */}
              <div className="flex items-center gap-3 sm:gap-4 pb-6 sm:pb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#fdf7f3] border border-[#eee2d8] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center">
                  <FiCompass className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#8b7355]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-normal text-gray-900">
                    Comprehensive Excellence
                  </h3>
                </div>
              </div>

              {/* Card content */}
              <div className="space-y-4 sm:space-y-6 text-justify">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Whether you're yearning for the thrill of a jungle safari, the tranquillity
                  of a yoga retreat, or the richness of immersive cultural tours, we offer a
                  comprehensive array of services tailored to ignite your wanderlust.
                </p>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  But what truly sets us apart is our unwavering commitment to creating
                  enriching experiences that transcend the ordinary.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Team Card with Animated List */}
          <div
            ref={el => cardRefs.current[1] = el}
            className="relative group opacity-0 transform translate-y-8 scale-95 transition-all duration-700"
            style={{ transitionDelay: '0.6s' }}
          >
            {/* Floating badge */}
            <div className="absolute -top-3 sm:-top-4 lg:-top-5 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-[#fdf7f3] border border-[#eee2d8] px-4 sm:px-6 py-1 sm:py-2 rounded-full shadow-md sm:shadow-lg">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Expert Team</span>
              </div>
            </div>

            <div className="relative bg-gradient-to-b from-white to-[#fdf7f3] border border-[#eee2d8] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 h-full group-hover:shadow-xl lg:group-hover:shadow-2xl transition-all duration-500">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-normal text-gray-900 pb-6 sm:pb-8 text-center">
                Our Powerhouse Team
              </h3>

              {/* Animated checklist */}
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Seasoned trekking guides",
                  "Skilled Sherpas",
                  "Insightful tour guides",
                  "Reliable porters",
                  "Adept drivers"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 sm:gap-4 group/item">
                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b7355] flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base group-hover/item:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className=" pt-6 sm:pt-8 border-t border-[#eee2d8]">
                <p className="text-gray-600 italic text-sm sm:text-base text-center">
                  All working in harmony to ensure that your journey is not just enjoyable but extraordinary.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Promise Card with Elegant Icons */}
          <div
            ref={el => cardRefs.current[2] = el}
            className="relative group opacity-0 transform translate-y-8 scale-95 transition-all duration-700"
            style={{ transitionDelay: '0.8s' }}
          >
            <div className="relative bg-gradient-to-b from-white to-[#fdf7f3] border border-[#eee2d8] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 h-full group-hover:shadow-xl lg:group-hover:shadow-2xl transition-all duration-500">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-normal text-gray-900 pb-6 sm:pb-8 text-center">
                Our Promise
              </h3>

              {/* Promise statements */}
              <div className="space-y-6 sm:space-y-8">
                <div className="border-l-2 sm:border-l-4 border-[#e6d5c3] pl-3 sm:pl-4">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
                    With every detail meticulously planned and every adventure expertly led,
                    we invite you to explore the world with confidence and curiosity. Let us transform your travel aspirations into reality, creating memories
                    that will resonate in your heart long after the journey concludes.
                  </p>
                </div>

                {/* Elegant quote */}
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-[#eee2d8]">
                  <p className="text-gray-800 italic text-sm sm:text-base text-center font-serif">
                    "Experience the world not just as a visitor, but as a cherished guest."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div
          ref={el => textRefs.current[1] = el}
          className="opacity-0 transform translate-y-8 transition-all duration-700"
          style={{ transitionDelay: '1s' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#fdf7f3] border border-[#eee2d8] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-gray-900 pb-4 sm:pb-6">
                Welcome by the cultures and landscapes that you discover
              </h3>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg pb-6 sm:pb-8 lg:pb-10 max-w-2xl mx-auto px-4">
                Our humble enterprise is bolstered by a powerhouse of expertise and dedication,
                ensuring your journey is not just enjoyable but extraordinary.
              </p>

              <button className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-black text-white font-medium rounded-full hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                Start Your Adventure
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;