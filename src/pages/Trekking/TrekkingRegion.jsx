// src/pages/TrekkingRegion.jsx
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import trekkingData from "../../data/trekking.json";
import { FiArrowRight, FiTrendingUp, FiActivity, FiCalendar, FiStar, FiUsers, FiMap, FiFlag, FiChevronRight } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TrekkingRegion = () => {
  const { regionSlug } = useParams();
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const highlightsRef = useRef(null);
  const trekCardsRef = useRef([]);

  const region = trekkingData.regions.find(
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

    // Trek cards staggered animation
    const trekObserver = new IntersectionObserver(
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

    trekCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "scale(0.9)";
        card.style.transition = "all 0.6s ease-out";
        trekObserver.observe(card);
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
      trekCardsRef.current.forEach(card => {
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
        <p className="text-xl">Region not found</p>
      </div>
    );
  }

  // Calculate max altitude from altitudeRange string
  const getMaxAltitude = () => {
    if (!region.altitudeRange) return "5000m+";
    const match = region.altitudeRange.match(/(\d+,?\d*)m/);
    if (match && match[1]) {
      return `${match[1]}m+`;
    }
    return region.altitudeRange;
  };

  return (
    <div className="bg-[#fcf6f2]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* CONTENT */}
            <div ref={textRef} className="order-2 lg:order-1">


              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light leading-tight text-gray-900 pb-4 sm:pb-6">
                Discover {region.name}
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed pb-6 sm:pb-8">
                {region.overview}
              </p>

              <Link
                to={`/trekking/${region.slug}#treks`}
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#2c5aa0] text-white font-medium hover:bg-[#1a365d] hover:shadow-lg transition-all duration-300 text-sm sm:text-base mb-8 sm:mb-10 rounded-lg"
              >
                Explore All Treks
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>


            </div>


            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2c5aa0]/10 via-transparent to-transparent" />
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2c5aa0] flex items-center justify-center">
                      <FiCalendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-gray-800 text-base">
                        {region.bestSeason[0]}
                      </div>
                      <div className="text-sm text-gray-500">Best Season</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META STRIP - Redesigned */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e8d9cc] p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Altitude Range</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">{region.altitudeRange}</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>

            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Difficulty Range</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">{region.difficultyRange}</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>

            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Trek Duration</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">{region.trekkingDays}</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>

            <div className="text-center p-4">
              <div className="text-sm text-gray-500 pb-2">Total Treks</div>
              <div className="text-xl font-serif font-bold text-[#1a365d]">{region.subcategories.length} routes</div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2c5aa0] to-transparent mx-auto mt-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Region Highlights - Glassmorphism Design */}
      <div ref={highlightsRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
        

        <div className="relative">
          <div className="text-center pb-20">
            <h2 className="text-4xl sm:text-5xl font-serif text-[#1a365d] pb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1a365d] to-[#2c5aa0]">
              {region.name} Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {region.highlights.map((highlight, index) => {
              const [title, description] = highlight.includes(':')
                ? highlight.split(':').map(part => part.trim())
                : [highlight, ''];

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

      {/* TREKS SECTION WITH ANIMATIONS */}
      <div id="treks" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 pt-8">
        <div className="text-center pb-16">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1a365d] pb-4">
            Available <span className="text-[#2c5aa0]">Treks</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from a variety of treks ranging from beginner-friendly to expert adventures
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {region.subcategories.map((trek, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={trek.id}
                ref={el => trekCardsRef.current[index] = el}
                className={`grid md:grid-cols-2 gap-8 sm:gap-12 items-center`}
              >
                {/* IMAGE WITH ENHANCED DESIGN */}
                <div
                  className={`relative h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl group ${reverse ? "md:order-2" : ""
                    }`}
                >
                  <img
                    src={trek.images?.thumbnail || region.image}
                    alt={trek.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                  

                  

                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className={`${reverse ? "md:text-left md:pr-8" : "md:text-left md:pl-8"}`}>
                  <div className="flex items-center gap-3 pb-4">
                    <span className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                      {trek.duration}
                    </span>
                   
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1a365d] leading-tight">
                    {trek.name}
                  </h2>

                  <p className="pt-4 sm:pt-6 text-gray-600 leading-relaxed text-base sm:text-lg">
                    {trek.shortDescription}
                  </p>

                  {/* ENHANCED STATS */}
                  <div className={`pt-6 sm:pt-8 flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600 ${reverse ? "md:justify-start" : ""
                    }`}>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#e8d9cc] shadow-sm">
                      <FiTrendingUp className="text-[#2c5aa0] w-4 h-4" />
                      <span className="font-medium">{trek.maxAltitude}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#e8d9cc] shadow-sm">
                      <FiActivity className="text-[#2c5aa0] w-4 h-4" />
                      <span className="font-medium">{trek.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#e8d9cc] shadow-sm">
                      <FiUsers className="text-[#2c5aa0] w-4 h-4" />
                      <span className="font-medium">Max {trek.groupSize}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className={`pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${reverse ? "md:flex-row-reverse" : ""
                    }`}>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-[#1a365d]">
                        ${trek.price?.perPerson}
                      </div>
                      <div className="text-sm text-gray-500">per person • All inclusive</div>
                    </div>

                    <Link
                      to={`/trekking/${region.slug}/${trek.slug}`}
                      className="group inline-flex items-center gap-3 text-[#2c5aa0] font-semibold text-base"
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

export default TrekkingRegion;