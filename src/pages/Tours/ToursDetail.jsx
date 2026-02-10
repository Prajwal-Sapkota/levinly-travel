import { useParams, Link } from "react-router-dom";
import tourData from "../../data/tour.json";
import {
    FiArrowLeft, FiClock, FiTrendingUp, FiActivity, FiCalendar,
    FiStar, FiUsers, FiCheck, FiX, FiChevronRight, FiHeart,
    FiShare2, FiMapPin, FiCompass, FiDownload, FiAlertCircle,
    FiArrowRight, FiChevronDown, FiChevronUp, FiList, FiCamera,
    FiHome, FiBriefcase, FiWind, FiSun, FiMap, FiMenu, FiChevronLeft
} from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect, useRef } from "react";

const ToursDetail = () => {
    const { regionSlug, tourSlug } = useParams();
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedDays, setExpandedDays] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroRef = useRef(null);
    const observerRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const region = tourData.categories.find(r => r.slug === regionSlug);
    const tour = region?.subcategories?.find(t => t.slug === tourSlug);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
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

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [regionSlug, tourSlug]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen || !tour?.images) return;

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
    }, [lightboxOpen, tour?.images]);

    if (!tour || !region) {
        return (
            <div className="min-h-screen bg-[#fcf6f2] flex items-center justify-center">
                {/* Keep your error page */}
            </div>
        );
    }

    const toggleDay = (dayIndex) => {
        setExpandedDays(prev =>
            prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
        );
    };

    const sections = [
        { id: 'overview', label: 'Overview', icon: <FiCompass /> },
        { id: 'itinerary', label: 'Itinerary', icon: <FiList /> },
        { id: 'included', label: 'What\'s Included', icon: <FiCheck /> },
        { id: 'essentials', label: 'Tour Essentials', icon: <FiActivity /> }
    ];

    if (tour.images && tour.images.length > 0) {
        sections.push({ id: 'gallery', label: 'Gallery', icon: <FiCamera /> });
    }

    const handleTabClick = (sectionId) => {
        setActiveSection(sectionId);
        setShowMobileMenu(false);

        setTimeout(() => {
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
        }, 100);
    };

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
        if (!tour.images) return;
        setCurrentImageIndex(prev =>
            prev === 0 ? tour.images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        if (!tour.images) return;
        setCurrentImageIndex(prev =>
            prev === tour.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="min-h-screen bg-[#fcf6f2]">
            <Navbar />

            {/* Hero Section */}
            <section ref={heroRef} className="relative bg-[#fcf6f2]">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-tight text-gray-900 pb-4 sm:pb-6">
                                {tour.name}
                            </h1>

                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pb-6 sm:pb-8">
                                {tour.shortDescription}
                            </p>

                            <div className="flex flex-wrap gap-2 sm:gap-3 pb-6 sm:pb-8">
                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                                    <FiClock className="text-[#2c5aa0] text-base sm:text-lg" />
                                    <span className="text-xs sm:text-sm font-medium text-gray-800">{tour.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                                    <FiMap className="text-[#2c5aa0] text-base sm:text-lg" />
                                    <span className="text-xs sm:text-sm font-medium text-gray-800">{tour.transport?.[0] || 'Private Vehicle'}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                                    <FiActivity className="text-[#2c5aa0] text-base sm:text-lg" />
                                    <span className="text-xs sm:text-sm font-medium text-gray-800">{tour.difficulty || 'Easy'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4">
                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                                >
                                    <span>Inquire This Tour</span>
                                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-4 sm:border-8 border-white">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#2c5aa0]/10 via-transparent to-transparent" />
                                <img
                                    src={tour.images?.[0] || region.image}
                                    alt={tour.name}
                                    className="w-full h-56 sm:h-64 md:h-72 lg:h-[400px] xl:h-[450px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:w-2/3">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:block sticky top-24 z-40 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100 mb-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-center gap-4 overflow-x-auto px-4">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleTabClick(section.id)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${activeSection === section.id
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
                        <div className="space-y-6 sm:space-y-8">
                            {/* Overview */}
                            <section id="overview" className="scroll-pt-28">
                                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 pb-4 sm:pb-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                            <FiCompass className="text-white text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">Overview</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg pb-4 sm:pb-6 lg:pb-8">{tour.fullDescription}</p>

                                    {tour.highlights && tour.highlights.length > 0 && (
                                        <div className="pt-6 sm:pt-8 lg:pt-10">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-[#1a365d] pb-4 sm:pb-6">Tour Highlights</h3>
                                            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                                {tour.highlights.map((highlight, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-[#fcf6f2] to-white rounded-xl border border-gray-100 hover:border-[#2c5aa0]/20 transition-colors">
                                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2c5aa0] flex items-center justify-center flex-shrink-0">
                                                            <span className="text-white text-xs sm:text-sm font-bold">{idx + 1}</span>
                                                        </div>
                                                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Itinerary */}
                            {tour.itinerary && (
                                <section id="itinerary" className="scroll-pt-28">
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-3 pb-6 sm:pb-8">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                                <FiList className="text-white text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Itinerary</h2>
                                                <p className="text-gray-600 text-sm">{tour.itinerary.length} days of exploration</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:gap-6">
                                            {tour.itinerary.map((day, idx) => (
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

                                                                {day.activities && day.activities.length > 0 && (
                                                                    <div className="">
                                                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                                                            {day.activities.map((activity, activityIdx) => (
                                                                                <span key={activityIdx}>
                                                                                    {activity}{activityIdx < day.activities.length - 1 ? ' • ' : ''}
                                                                                </span>
                                                                            ))}
                                                                        </p>
                                                                    </div>
                                                                )}
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
                                        {tour.inclusions.map((item, idx) => (
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
                            <section id="essentials" className="scroll-pt-28">
                                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 pb-6 sm:pb-8">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                            <FiActivity className="text-white text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d]">Tour Essentials</h2>
                                    </div>

                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pb-4 sm:pb-6">Travel Requirements</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                            {[
                                                "Valid Passport",
                                                "Travel Insurance",
                                                "Comfortable Shoes",
                                                "Appropriate Clothing",
                                                "Camera",
                                                "Personal Medication",
                                                "Power Adapter",
                                                "Day Pack"
                                            ].map((item, idx) => (
                                                <div key={idx} className="p-4 bg-[#fcf6f2] rounded-xl border border-gray-200 hover:border-[#2c5aa0] transition-colors text-center">
                                                    <div className="font-medium text-gray-900 text-sm sm:text-base">{item}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Gallery */}
                            {tour.images && tour.images.length > 0 && (
                                <section id="gallery" className="scroll-pt-28">
                                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-3 pb-4 sm:pb-6 lg:pb-8">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                                <FiCamera className="text-white text-lg sm:text-xl" />
                                            </div>
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">Photo Gallery</h2>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                                            {tour.images.slice(0, 8).map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => openLightbox(idx)}
                                                    className="aspect-square rounded-lg sm:rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#2c5aa0] focus:ring-offset-2"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`${tour.name} ${idx + 1}`}
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
                    <div className="lg:w-1/3 pt-6 sm:pt-8 lg:pt-0">
                        <div className="sticky top-32 space-y-4 sm:space-y-6">
                            {/* Contact Card */}
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-6 sm:p-8">
                                    <div className="text-center pb-6">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] flex items-center justify-center mx-auto mb-4">
                                            <FiCompass className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-xl font-serif text-[#1a365d] pb-2">Need More Details?</h3>
                                        <p className="text-gray-600 text-sm">Get personalized tour information</p>
                                    </div>

                                    <Link
                                        to="/contact"
                                        onClick={() => { window.scrollTo(0, 0); }}

                                        className="w-full py-4 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                                    >
                                        <span>Contact Us Today</span>
                                        <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="bg-[#fcf6f2] border-t border-gray-200 p-4 sm:p-6">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <FiAlertCircle className="text-[#2c5aa0] flex-shrink-0" />
                                        <span className="text-sm">Flexible dates and easy booking</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Facts Card */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-[#1a365d] pb-4 border-b border-gray-100">Quick Facts</h3>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <FiClock className="text-[#2c5aa0]" />
                                            <span className="text-gray-600">Duration</span>
                                        </div>
                                        <span className="font-medium text-gray-900">{tour.duration}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <FiMap className="text-[#2c5aa0]" />
                                            <span className="text-gray-600">Transport</span>
                                        </div>
                                        <span className="font-medium text-gray-900">{tour.transport?.join(', ') || 'Private Vehicle'}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <FiActivity className="text-[#2c5aa0]" />
                                            <span className="text-gray-600">Difficulty</span>
                                        </div>
                                        <span className="font-medium text-gray-900">{tour.difficulty || 'Easy'}</span>
                                    </div>

                                    {tour.tags && tour.tags.length > 0 && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="text-sm font-medium text-gray-700 pb-3">Tour Type</div>
                                            <div className="flex flex-wrap gap-2">
                                                {tour.tags.slice(0, 3).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-[#2c5aa0] hover:text-white transition-colors capitalize"
                                                    >
                                                        {tag.replace('-', ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tour Highlights Card */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 pb-4">
                                    <FiStar className="text-[#2c5aa0]" />
                                    <h3 className="text-lg font-semibold text-[#1a365d]">Key Highlights</h3>
                                </div>
                                <div className="space-y-3">
                                    {tour.highlights?.slice(0, 4).map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2c5aa0]/10 flex items-center justify-center flex-shrink-0 pt-0.5">
                                                <span className="text-[#2c5aa0] text-xs font-bold">{idx + 1}</span>
                                            </div>
                                            <span className="text-gray-700 text-sm">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Tours */}
                <div className="pt-12 sm:pt-16 lg:pt-32 border-t border-gray-200">
                    <div className="text-center pb-8 sm:pb-12">
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#1a365d] pb-3 sm:pb-4">More Tours in {region.name}</h2>
                        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Discover other amazing tours in this category</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {region.subcategories
                            .filter(t => t.id !== tour.id)
                            .slice(0, 3)
                            .map((similarTour) => (
                                <Link
                                    key={similarTour.id}
                                    to={`/tours/${region.slug}/${similarTour.slug}`}
                                    onClick={() => { window.scrollTo(0, 0); }}

                                    className="group"
                                >
                                    <div className="aspect-video rounded-xl overflow-hidden pb-4 sm:pb-6">
                                        <img
                                            src={similarTour.images?.[0] || region.image}
                                            alt={similarTour.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pb-1 sm:pb-2 group-hover:text-[#2c5aa0] transition-colors">
                                            {similarTour.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm pb-3 sm:pb-4 line-clamp-2">
                                            {similarTour.shortDescription}
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
                            to={`/tours/${region.slug}`}
                            onClick={() => { window.scrollTo(0, 0); }}
                            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#1a365d] text-white rounded-xl hover:bg-[#2c5aa0] transition-all duration-300 text-sm sm:text-base"
                        >
                            <FiCompass /> View All {region.name} Tours
                        </Link>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && tour.images && (
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
                        <FiChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>

                    {/* Image container */}
                    <div className="relative mx-4 max-w-5xl">
                        <img
                            src={tour.images[currentImageIndex]}
                            alt={`${tour.name} ${currentImageIndex + 1}`}
                            className="max-h-[80vh] max-w-full rounded-lg shadow-2xl"
                        />

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                            {currentImageIndex + 1} / {tour.images.length}
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

const FactItem = ({ label, value }) => (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
        <span className="text-gray-600 text-sm">{label}</span>
        <span className="font-medium text-gray-900 text-right max-w-[60%] text-sm">{value}</span>
    </div>
);

export default ToursDetail;