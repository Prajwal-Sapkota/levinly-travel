// src/pages/ToursRegion.jsx
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import tourData from "../../data/tour.json";
import { FiArrowRight, FiClock, FiMap, FiStar, FiUsers, FiCompass, FiChevronRight } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ToursRegion = () => {
  const { regionSlug } = useParams();
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const highlightsRef = useRef(null);
  const tourCardsRef = useRef([]);

  const region = tourData.categories.find(
    (r) => r.slug === regionSlug
  );

  useEffect(() => {
    // Hero animations
    if (textRef.current) {
      textRef.current.style.opacity = "0";
      textRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.transition = "all 0.8s ease";
          textRef.current.style.opacity = "1";
          textRef.current.style.transform = "translateY(0)";
        }
      }, 200);
    }

    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      imageRef.current.style.transform = "scale(0.95) rotate(2deg)";
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transition = "all 0.8s ease 0.3s";
          imageRef.current.style.opacity = "1";
          imageRef.current.style.transform = "scale(1) rotate(0deg)";
        }
      }, 400);
    }

    // Highlights section animation
    if (highlightsRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 }
      );

      const highlightItems = highlightsRef.current.querySelectorAll('.highlight-item');
      highlightItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
      });
    }

    // Tour cards staggered animation
    const tourObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "scale(1)";
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    tourCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "scale(0.9)";
        card.style.transition = "all 0.6s ease-out";
        tourObserver.observe(card);
      }
    });

    return () => {
      if (highlightsRef.current) {
        const highlightItems = highlightsRef.current.querySelectorAll('.highlight-item');
        highlightItems.forEach(item => {
          const observer = IntersectionObserver();
          observer?.unobserve(item);
        });
      }
      tourCardsRef.current.forEach(card => {
        if (card) {
          const observer = IntersectionObserver();
          observer?.unobserve(card);
        }
      });
    };
  }, [regionSlug]);

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf6f2]">
        <p className="text-xl">Tour category not found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fcf6f2]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* CONTENT */}
            <div ref={textRef} className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl  font-serif font-light leading-tight text-gray-900 pb-4 sm:pb-6">
                Explore {region.name}
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed pb-6 sm:pb-8">
                {region.description}
              </p>

              <Link
                to={`/tours/${region.slug}#tours`}
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#2c5aa0] text-white font-medium hover:bg-[#1a365d] hover:shadow-lg transition-all duration-300 text-sm sm:text-base mb-8 sm:mb-10 rounded-lg"
                onClick={() => { window.scrollTo(0, 0); }}

              >
                Explore All Tours
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>



            </div>

            {/* IMAGE */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2c5aa0]/10 via-transparent to-transparent" />
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e8d9cc] p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Tour Duration</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">{region.duration}</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>

            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Tour Packages</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">{region.subcategories.length} options</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>

            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Difficulty</div>
              <div className="text-xl font-serif font-bold text-[#1a365d">Easy</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>

            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Transport</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">Multiple</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Region Highlights */}
      <div ref={highlightsRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
        <div className="relative">
          <div className="text-center pb-20">
            <h2 className="text-4xl sm:text-5xl font-serif text-[#1a365d] pb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1a365d] to-[#2c5aa0]">
              Why Choose {region.name}?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => {
              const themes = [
                "Cultural Immersion - Experience authentic local traditions",
                "Comfortable Travel - Well-planned itineraries with quality accommodation",
                "Expert Guides - Knowledgeable local tour guides",
                "Flexible Options - Customizable tour packages available",
                "Value for Money - All-inclusive packages at competitive prices",
                "Memorable Experiences - Create lasting memories with unique activities"
              ];

              const [title, description] = themes[index]?.includes(':')
                ? themes[index].split(':').map(part => part.trim())
                : [themes[index], ''];

              return (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2c5aa0]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Main card */}
                  <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-8 shadow-2xl shadow-[#2c5aa0]/5 group-hover:shadow-[#2c5aa0]/20 transition-all duration-500 hover:scale-[1.02] flex flex-col">
                    {/* Reflective top edge */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>

                    {/* Content container with side-by-side layout */}
                    <div className="flex items-start gap-6 flex-1">
                      {/* Animated number on the side */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2c5aa0]/30 to-transparent rounded-full blur-lg animate-pulse"></div>
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#1a365d] to-[#2c5aa0] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#2c5aa0]/30 group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        {/* Title with gradient */}
                        <h3 className="text-xl font-bold text-[#1a365d] pb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#1a365d] group-hover:to-[#2c5aa0] transition-all duration-500">
                          {title}
                        </h3>

                        {/* Description with fade effect */}
                        {description && (
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            <p className="text-gray-600 leading-relaxed text-sm">
                              {description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inner shadow on hover */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_20px_rgba(44,90,160,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TOURS SECTION */}
      <div id="tours" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 pt-8">
        <div className="text-center pb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1a365d] pb-4">
            Available <span className="text-[#2c5aa0]">Tours</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from a variety of tour packages tailored to different interests and durations
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {region.subcategories.map((tour, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={tour.id}
                ref={el => tourCardsRef.current[index] = el}
                className={`grid md:grid-cols-2 gap-8 sm:gap-12 items-center`}
              >
                {/* IMAGE */}
                <div
                  className={`relative h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl group ${reverse ? "md:order-2" : ""
                    }`}
                >
                  <img
                    src={tour.images?.[0] || region.image}
                    alt={tour.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />




                </div>

                {/* CONTENT */}
                <div className={`${reverse ? "md:text-left md:pr-8" : "md:text-left md:pl-8"}`}>
                  <div className="flex items-center gap-3 pb-4">
                    <span className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                      {tour.duration}
                    </span>

                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1a365d] leading-tight">
                    {tour.name}
                  </h2>

                  <p className="pt-4 sm:pt-6 text-gray-600 leading-relaxed text-base sm:text-lg">
                    {tour.shortDescription}
                  </p>

                  {/* TOUR STATS */}
                  <div className={`pt-6 sm:pt-8 flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600 ${reverse ? "md:justify-start" : ""
                    }`}>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#e8d9cc] shadow-sm">
                      <FiClock className="text-[#2c5aa0] w-4 h-4" />
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#e8d9cc] shadow-sm">
                      <FiCompass className="text-[#2c5aa0] w-4 h-4" />
                      <span className="font-medium">{tour.transport?.[0] || 'Private Vehicle'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#e8d9cc] shadow-sm">
                      <FiUsers className="text-[#2c5aa0] w-4 h-4" />
                      <span className="font-medium">Small Groups</span>
                    </div>
                  </div>

                  {/* HIGHLIGHTS PREVIEW */}
                  {tour.highlights && tour.highlights.length > 0 && (
                    <div className="pt-6">
                      <h4 className="text-sm font-semibold text-gray-700 pb-3">Tour Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-[#f0e6dc] text-gray-700 rounded-lg text-xs">
                            {highlight.includes('-') ? highlight.split('-')[0].trim() : highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className={`pt-8 sm:pt-10  items-start sm:items-center justify-between gap-4 ${reverse ? "md:flex-row-reverse" : ""
                    }`}>


                    <Link
                      to={`/tours/${region.slug}/${tour.slug}`}
                      className="group inline-flex items-center gap-3 text-[#2c5aa0] font-semibold text-base"
                      onClick={() => { window.scrollTo(0, 0); }}

                    >
                      <span className="group-hover:underline">View Details</span>
                      <span className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <FiArrowRight className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ToursRegion;