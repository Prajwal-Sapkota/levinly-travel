import { useParams, Link } from "react-router-dom";
import trekkingData from "../../data/trekking.json";
import {
  FiArrowLeft, FiClock, FiTrendingUp, FiActivity, FiCheck,
  FiChevronRight, FiList, FiCamera, FiCompass, FiAlertCircle,
  FiX, FiChevronLeft, FiChevronRight as FiChevronRightIcon
} from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

const TrekkingDetail = () => {
  const { regionSlug, trekSlug } = useParams();
  const [activeSection, setActiveSection] = useState('overview');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const region = trekkingData.regions.find(r => r.slug === regionSlug);
  const trek = region?.subcategories?.find(t => t.slug === trekSlug);

  // Scroll to top on mount and handle section highlighting
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = ['overview', 'itinerary', 'included', 'essentials', 'gallery'];
      const headerOffset = 120;
      const scrollPosition = window.scrollY + headerOffset + 50;
      let currentSection = 'overview';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const elementBottom = elementTop + elementHeight;
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // Fallback to closest section
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [regionSlug, trekSlug]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen || !trek?.images?.gallery) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, trek?.images?.gallery]);

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
            onClick={() => { window.scrollTo(0, 0); }}

          >
            <FiArrowLeft /> Browse All Treks
          </Link>
        </div>
      </div>
    );
  }

  // Lightbox functions
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (!trek.images?.gallery) return;
    setCurrentImageIndex(prev =>
      prev === 0 ? trek.images.gallery.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!trek.images?.gallery) return;
    setCurrentImageIndex(prev =>
      prev === trek.images.gallery.length - 1 ? 0 : prev + 1
    );
  };

  // Navigation sections
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
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf6f2]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#fcf6f2]">
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
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                  onClick={() => { window.scrollTo(0, 0); }}

                >
                  <span>Inquire About This Trek</span>
                  <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Desktop Navigation */}
            <div className="hidden lg:block sticky top-24 z-40 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100 rounded-xl shadow-sm mb-6">
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
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg pb-6 sm:pb-8">
                    {trek.fullDescription}
                  </p>
                </div>
              </section>

              {/* Itinerary */}
              {trek.itinerary && (
                <section id="itinerary" className="scroll-pt-28">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 pb-6 sm:pb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                        <FiList className="text-white text-lg sm:text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Itinerary</h2>
                        <p className="text-gray-600 text-sm">{trek.itinerary.length} days of adventure</p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:gap-6">
                      {trek.itinerary.map((day, idx) => (
                        <div
                          key={idx}
                          className="group relative bg-white rounded-xl border border-[#eee2d8] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
                        >
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-amber-100/40 via-transparent to-transparent pointer-events-none" />

                          <div className="relative p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-14 h-12 sm:w-16 sm:h-14 rounded-xl bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] flex items-center justify-center shadow-md">
                                  <span className="text-white font-bold text-base sm:text-lg">Day {day.day}</span>
                                </div>
                              </div>

                              <div className="flex-1">
                                <h3 className="text-base sm:text-lg font-medium text-gray-800 pb-2 group-hover:text-[#2c5aa0] transition-colors">
                                  {day.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                  {day.description}
                                </p>
                              </div>
                            </div>
                          </div>
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
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {trek.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="text-green-600 text-xs sm:text-sm" />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Essentials */}
              {trek.gearChecklist && (
                <section id="essentials" className="scroll-pt-28">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 pb-6 sm:pb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                        <FiActivity className="text-white text-lg sm:text-xl" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Essential Information</h2>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pb-3 sm:pb-4">Recommended Gear</h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {trek.gearChecklist.slice(0, 8).map((item, idx) => (
                          <div key={idx} className="p-3 sm:p-4 bg-[#fcf6f2] rounded-xl border border-gray-200">
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

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
                        <button
                          key={idx}
                          onClick={() => openLightbox(idx)}
                          className="aspect-square rounded-lg sm:rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#2c5aa0] focus:ring-offset-2"
                        >
                          <img
                            src={img}
                            alt={`${trek.name} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 pt-8 lg:pt-0">
            <div className="sticky top-24">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
                <div className="p-8">
                  <div className="text-center pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] flex items-center justify-center mx-auto mb-4">
                      <FiCompass className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-serif text-[#1a365d] pb-2">Ready for Adventure?</h3>
                    <p className="text-gray-600 text-sm">Get personalized trek information</p>
                  </div>

                  <Link
                    to="/contact"
                    className="w-full py-4 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                    onClick={() => { window.scrollTo(0, 0); }}

                  >
                    <span>Contact Us Today</span>
                    <FiChevronRightIcon className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="bg-[#fcf6f2] border-t border-gray-200 p-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiAlertCircle className="text-[#2c5aa0] flex-shrink-0" />
                    <span className="text-sm">Custom dates for groups of 4+</span>
                  </div>
                </div>
              </div>

              {/* Quick Facts Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#1a365d] pb-4 border-b border-gray-100">Quick Facts</h3>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <FiClock className="text-[#2c5aa0]" />
                      <span className="text-gray-600">Duration</span>
                    </div>
                    <span className="font-medium text-gray-900">{trek.duration}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <FiTrendingUp className="text-[#2c5aa0]" />
                      <span className="text-gray-600">Max Altitude</span>
                    </div>
                    <span className="font-medium text-gray-900">{trek.maxAltitude}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <FiActivity className="text-[#2c5aa0]" />
                      <span className="text-gray-600">Difficulty</span>
                    </div>
                    <span className="font-medium text-gray-900">{trek.difficulty}</span>
                  </div>

                  {trek.ageRequirement && (
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <FiAlertCircle className="text-[#2c5aa0]" />
                        <span className="text-gray-600">Age Requirement</span>
                      </div>
                      <span className="font-medium text-gray-900">{trek.ageRequirement}</span>
                    </div>
                  )}

                  {trek.permits && trek.permits.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-sm font-medium text-gray-700 pb-3">Required Permits</div>
                      <div className="flex flex-wrap gap-2">
                        {trek.permits.map((permit, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-[#2c5aa0] hover:text-white transition-colors"
                          >
                            {permit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Treks */}
        <div className="pt-16 border-t border-gray-200">
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
                  onClick={() => { window.scrollTo(0, 0); }}

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
                    <div className="flex items-center gap-1 text-[#2c5aa0] text-xs sm:text-sm font-semibold">
                      View Details <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center pt-8 sm:pt-12">
            <Link
              to={`/trekking/${region.slug}`}
              onClick={() => { window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#1a365d] text-white rounded-xl hover:bg-[#2c5aa0] transition-all duration-300 text-sm sm:text-base"
            >
              <FiCompass /> View All {region.name} Treks
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && trek.images?.gallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
            aria-label="Close lightbox"
          >
            <FiX className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
            aria-label="Previous image"
          >
            <FiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
            aria-label="Next image"
          >
            <FiChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Image container */}
          <div className="relative mx-4 max-w-5xl">
            <img
              src={trek.images.gallery[currentImageIndex]}
              alt={`${trek.name} ${currentImageIndex + 1}`}
              className="max-h-[80vh] max-w-full rounded-lg shadow-2xl"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {trek.images.gallery.length}
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10 cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TrekkingDetail;