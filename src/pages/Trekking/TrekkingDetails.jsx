import { useParams, Link } from "react-router-dom";
import trekkingData from "../../data/trekking.json";
import {
  FiArrowLeft, FiClock, FiTrendingUp, FiActivity, FiCalendar,
  FiStar, FiUsers, FiCheck, FiX, FiChevronRight, FiHeart,
  FiShare2, FiMapPin, FiCompass, FiDownload, FiAlertCircle,
  FiArrowRight, FiChevronDown, FiChevronUp, FiList, FiCamera,
  FiHome, FiBriefcase, FiWind, FiSun, FiMenu
} from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect, useRef } from "react";

const TrekkingDetail = () => {
  const { regionSlug, trekSlug } = useParams();
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedDays, setExpandedDays] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const heroRef = useRef(null);
  const observerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const region = trekkingData.regions.find(r => r.slug === regionSlug);
  const trek = region?.subcategories?.find(t => t.slug === trekSlug);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = ['overview', 'itinerary', 'included', 'essentials', 'gallery'];
      const headerOffset = 120; // Height of your sticky header

      // Get current scroll position
      const scrollPosition = window.scrollY + headerOffset + 50; // Add some buffer

      let currentSection = 'overview';

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const elementBottom = elementTop + elementHeight;

          // Check if scroll position is within this section
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // Fallback: find the section closest to the top
      if (currentSection === 'overview') {
        let closestSection = 'overview';
        let minDistance = Infinity;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const distance = Math.abs(element.offsetTop - scrollPosition);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = sectionId;
            }
          }
        }
        currentSection = closestSection;
      }

      setActiveSection(currentSection);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [regionSlug, trekSlug]);

  if (!trek || !region) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fcf6f2] to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl pb-6">🏔️</div>
          <h2 className="text-3xl font-serif text-[#1a365d] pb-4">Trek Not Found</h2>
          <p className="text-gray-600 pb-8 max-w-md">The trek you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/trekking"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-xl hover:bg-[#2c5aa0] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft /> Browse All Treks
          </Link>
        </div>
      </div>
    );
  }

  const toggleDay = (dayIndex) => {
    setExpandedDays(prev =>
      prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  const getSeasonStatus = (monthIndex) => {
    const bestMonths = [];
    trek.bestSeason?.forEach(season => {
      if (season === "March-May") bestMonths.push(2, 3, 4);
      if (season === "September-November") bestMonths.push(8, 9, 10);
    });

    if (bestMonths.length === 0) {
      region.bestSeason?.forEach(season => {
        if (season === "March-May") bestMonths.push(2, 3, 4);
        if (season === "September-November") bestMonths.push(8, 9, 10);
      });
    }

    if (bestMonths.includes(monthIndex)) return 'best';
    if (monthIndex >= 5 && monthIndex <= 7) return 'monsoon';
    if (monthIndex === 11 || monthIndex === 0 || monthIndex === 1) return 'winter';
    return 'good';
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: <FiCompass /> },
    { id: 'itinerary', label: 'Itinerary', icon: <FiList /> },
    { id: 'included', label: 'What\'s Included', icon: <FiCheck /> },
    { id: 'essentials', label: 'Essentials', icon: <FiActivity /> }
  ];

  if (trek.images?.gallery && trek.images.gallery.length > 0) {
    sections.push({ id: 'gallery', label: 'Gallery', icon: <FiCamera /> });
  }

  const handleTabClick = (sectionId) => {
    setActiveSection(sectionId);
    setShowMobileMenu(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Adjust based on your header height
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="min-h-screen bg-[#fcf6f2]">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-[#fcf6f2]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight text-gray-900 pb-4 sm:pb-6">
                {trek.name}
              </h1>

              <p className="text-gray-600 text-base leading-relaxed pb-6 sm:pb-8">
                {trek.shortDescription}
              </p>

              <div className="flex flex-wrap gap-3 pb-8">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                  <FiClock className="text-[#2c5aa0] text-lg" />
                  <span className="text-sm font-medium text-gray-800">{trek.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                  <FiTrendingUp className="text-[#2c5aa0] text-lg" />
                  <span className="text-sm font-medium text-gray-800">{trek.maxAltitude}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                  <FiActivity className="text-[#2c5aa0] text-lg" />
                  <span className="text-sm font-medium text-gray-800">{trek.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                  <FiStar className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-800">{trek.rating}</span>
                  <span className="text-gray-600 text-sm">({trek.reviews})</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  <span>Book This Trek</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2c5aa0]/10 via-transparent to-transparent" />
                <img
                  src={trek.images?.thumbnail || region.image}
                  alt={trek.name}
                  className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div className="relative -pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              <StatItem icon={<FiCalendar />} label="Best Season" value={trek.bestSeason?.join(' • ') || region.bestSeason.join(' • ')} />
              <StatItem icon={<FiUsers />} label="Group Size" value={trek.groupSize || "2-12 people"} />
              <StatItem icon={<FiHome />} label="Accommodation" value={trek.accommodation?.split(' ')[0] || "Teahouses"} />
              <StatItem icon={<FiBriefcase />} label="Permits" value={`${trek.permits?.length || 2} required`} />
              <StatItem icon={<FiWind />} label="Start Point" value="Kathmandu" />
              <StatItem icon={<FiSun />} label="Weather" value="Variable" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Desktop Navigation */}
            <div className="hidden lg:block sticky top-24 z-40 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100 pb-12 rounded-xl shadow-sm">
              <div className="flex items-center justify-center gap-4 overflow-x-auto px-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleTabClick(section.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${activeSection === section.id
                      ? 'bg-[#1a365d] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden sticky top-20 z-50 pb-8">
              <div className="relative" ref={mobileMenuRef}>
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="w-full flex items-center justify-between px-4 py-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {sections.find(s => s.id === activeSection)?.icon}
                    <span className="font-medium text-gray-900">
                      {sections.find(s => s.id === activeSection)?.label || 'Menu'}
                    </span>
                  </div>
                  <FiMenu className="text-gray-500" />
                </button>

                {/* Mobile Dropdown Menu */}
                {showMobileMenu && (
                  <div className="absolute top-full left-0 right-0 pt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleTabClick(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0 ${activeSection === section.id
                          ? 'bg-[#1a365d] text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {section.icon}
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Overview */}
              <section id="overview" className="scroll-pt-28">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 pb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                      <FiCompass className="text-white text-lg sm:text-xl" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Overview</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg pb-6 sm:pb-8">{trek.fullDescription}</p>

                  {trek.highlights && trek.highlights.length > 0 && (
                    <div className="pt-8 sm:pt-10">
                      <h3 className="text-xl sm:text-2xl font-serif text-[#1a365d] pb-4 sm:pb-6">Highlights</h3>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {trek.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-br from-[#fcf6f2] to-white rounded-xl border border-gray-100 hover:border-[#2c5aa0]/20 transition-colors">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2c5aa0] flex items-center justify-center flex-shrink-0 pt-0.5">
                              <span className="text-white text-xs sm:text-sm font-bold">{idx + 1}</span>
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Itinerary */}
              {trek.itinerary && (
                <section id="itinerary" className="scroll-pt-28">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-8 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                          <FiList className="text-white text-lg sm:text-xl" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Itinerary</h2>
                          <p className="text-gray-600 text-sm">{trek.itinerary.length} days of adventure</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2.5 text-[#2c5aa0] font-semibold hover:text-[#1a365d] transition-colors border border-[#2c5aa0] rounded-lg hover:bg-[#2c5aa0]/5 text-sm">
                        <FiDownload /> Download PDF
                      </button>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {trek.itinerary.map((day, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
                          <button
                            onClick={() => toggleDay(idx)}
                            className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                          >
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-base sm:text-lg">Day {day.day}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{day.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm pt-1">
                                  {day.trekTime && (
                                    <span className="flex items-center gap-1">
                                      <FiClock className="w-3 h-3" /> {day.trekTime} hours
                                    </span>
                                  )}
                                  {day.altitude && (
                                    <span className="flex items-center gap-1">
                                      <FiTrendingUp className="w-3 h-3" /> {day.altitude}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {expandedDays.includes(idx) ?
                              <FiChevronUp className="text-gray-400 flex-shrink-0 ml-2" /> :
                              <FiChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
                            }
                          </button>

                          {expandedDays.includes(idx) && (
                            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                              <div className="pt-4 border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{day.description}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Included */}
              <section id="included" className="scroll-pt-28">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 pb-6 sm:pb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                      <FiCheck className="text-white text-lg sm:text-xl" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">What's Included</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-green-700 flex items-center gap-2">
                        <FiCheck /> Included Services
                      </h3>
                      <div className="space-y-3">
                        {trek.inclusions.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 pt-0.5">
                              <FiCheck className="text-green-600 text-xs sm:text-sm" />
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-red-700 flex items-center gap-2">
                        <FiX /> Not Included
                      </h3>
                      <div className="space-y-3">
                        {trek.exclusions.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 pt-0.5">
                              <FiX className="text-red-600 text-xs" />
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Essentials */}
              <section id="essentials" className="scroll-pt-28">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 pb-6 sm:pb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                      <FiActivity className="text-white text-lg sm:text-xl" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Essential Information</h2>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pb-3 sm:pb-4">Gear Checklist</h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {trek.gearChecklist.slice(0, 8).map((item, idx) => (
                          <div key={idx} className="p-3 sm:p-4 bg-[#fcf6f2] rounded-xl border border-gray-200 hover:border-[#2c5aa0] transition-colors">
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pb-3 sm:pb-4">Best Time to Trek</h3>
                      <div className="bg-gradient-to-br from-[#fcf6f2] to-white rounded-xl p-4 sm:p-6 border border-gray-200">
                        <div className="grid grid-cols-6 gap-1 sm:gap-2 pb-4 sm:pb-6">
                          {months.map((month, idx) => {
                            const status = getSeasonStatus(idx);
                            return (
                              <div key={month} className="text-center">
                                <div className={`h-6 sm:h-8 rounded-lg flex items-center justify-center pb-1 sm:pb-2 text-xs sm:text-sm font-medium border transition-colors ${status === 'best' ? 'bg-green-50 text-green-700 border-green-200' :
                                  status === 'monsoon' ? 'bg-red-50 text-red-700 border-red-200' :
                                    status === 'winter' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                      'bg-gray-50 text-gray-600 border-gray-200'
                                  }`}>
                                  {month}
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-500">
                                  {status === 'best' ? '✓ Best' :
                                    status === 'monsoon' ? '✗ Avoid' :
                                      status === 'winter' ? '❄️ Cold' : 'Good'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 pt-4 border-t border-gray-300">
                          <div className="flex items-center gap-1 sm:gap-2"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />Best</div>
                          <div className="flex items-center gap-1 sm:gap-2"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-400" />Good</div>
                          <div className="flex items-center gap-1 sm:gap-2"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />Avoid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gallery */}
              {trek.images?.gallery && trek.images.gallery.length > 0 && (
                <section id="gallery" className="scroll-pt-28">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 pb-6 sm:pb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                        <FiCamera className="text-white text-lg sm:text-xl" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Photo Gallery</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                      {trek.images.gallery.slice(0, 8).map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer">
                          <img
                            src={img}
                            alt={`${trek.name} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 pt-8 lg:pt-0">
            <div className="sticky top-32 space-y-6">
              {/* Price Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="text-center pb-6 sm:pb-8">
                    <div className="text-4xl sm:text-5xl font-bold text-[#1a365d] pb-2">${trek.price?.perPerson}</div>
                    <div className="text-gray-600 text-sm sm:text-base">per person ({trek.price?.currency || 'USD'})</div>
                  </div>

                  <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 pb-4 sm:pb-6 text-sm sm:text-base">
                    Book Now
                  </button>

                  <div className="space-y-3 sm:space-y-4">
                    {trek.price?.childDiscount && (
                      <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base">Child Discount</span>
                        <span className="font-semibold text-green-600 text-sm sm:text-base">{trek.price.childDiscount}</span>
                      </div>
                    )}

                    {trek.price?.groupDiscount && (
                      <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base">Group Discount</span>
                        <span className="font-semibold text-green-600 text-sm sm:text-base">{trek.price.groupDiscount}</span>
                      </div>
                    )}

                    {trek.price?.singleSupplement && (
                      <div className="flex justify-between items-center py-2 sm:py-3">
                        <span className="text-gray-600 text-sm sm:text-base">Single Room</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">+ ${trek.price.singleSupplement}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#fcf6f2] border-t border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                    <FiAlertCircle className="text-[#2c5aa0] text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm">Free cancellation up to 30 days before departure</span>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 pb-4 sm:pb-6">
                  <FiCompass className="text-[#2c5aa0]" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#1a365d]">Quick Facts</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <FactItem label="Duration" value={trek.duration} />
                  <FactItem label="Max Altitude" value={trek.maxAltitude} />
                  <FactItem label="Difficulty" value={trek.difficulty} />
                  <FactItem label="Age Requirement" value={trek.ageRequirement} />
                  <FactItem label="Physical Requirements" value={trek.physicalRequirements} />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 pb-1">Required Permits</div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {trek.permits.map((permit, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {permit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Treks */}
        <div className="pt-16 sm:pt-32 pt-8 sm:pt-16 border-t border-gray-200">
          <div className="text-center pb-8 sm:pb-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d] pb-3 sm:pb-4">More Adventures in {region.name}</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Discover other incredible treks in this stunning region</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {region.subcategories
              .filter(t => t.id !== trek.id)
              .slice(0, 3)
              .map((similarTrek) => (
                <Link
                  key={similarTrek.id}
                  to={`/trekking/${region.slug}/${similarTrek.slug}`}
                  className="group"
                >
                  <div className="aspect-video rounded-xl overflow-hidden pb-4 sm:pb-6">
                    <img
                      src={similarTrek.images?.thumbnail}
                      alt={similarTrek.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pb-1 sm:pb-2 group-hover:text-[#2c5aa0] transition-colors">
                      {similarTrek.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm pb-3 sm:pb-4 line-clamp-2">
                      {similarTrek.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-[#1a365d] text-sm sm:text-base">${similarTrek.price?.perPerson}</div>
                      <div className="flex items-center gap-1 text-[#2c5aa0] text-xs sm:text-sm font-semibold">
                        View Details <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center pt-8 sm:pt-12">
            <Link
              to={`/trekking/${region.slug}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#1a365d] text-white rounded-xl hover:bg-[#2c5aa0] transition-all duration-300 text-sm sm:text-base"
            >
              <FiCompass /> View All {region.name} Treks
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-[#1a365d]">${trek.price?.perPerson}</div>
            <div className="text-gray-600 text-xs">{trek.duration}</div>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm">
            Book Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="text-center">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fcf6f2] flex items-center justify-center mx-auto pb-2 sm:pb-3 text-[#2c5aa0]">
      {icon}
    </div>
    <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider pb-1">{label}</div>
    <div className="font-semibold text-[#1a365d] text-xs sm:text-sm">{value}</div>
  </div>
);

const FactItem = ({ label, value }) => (
  <div className="flex items-start justify-between py-1.5 sm:py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600 text-xs sm:text-sm">{label}</span>
    <span className="font-medium text-gray-900 text-right max-w-[60%] text-xs sm:text-sm">{value}</span>
  </div>
);

export default TrekkingDetail;