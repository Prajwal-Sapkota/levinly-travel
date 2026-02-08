// src/pages/ToursDetail.jsx
import { useParams, Link } from "react-router-dom";
import tourData from "../../data/tour.json";
import {
    FiArrowLeft, FiClock, FiTrendingUp, FiActivity, FiCalendar,
    FiStar, FiUsers, FiCheck, FiX, FiChevronRight, FiHeart,
    FiShare2, FiMapPin, FiCompass, FiDownload, FiAlertCircle,
    FiArrowRight, FiChevronDown, FiChevronUp, FiList, FiCamera,
    FiHome, FiBriefcase, FiWind, FiSun, FiMap, FiMenu
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

    const heroRef = useRef(null);
    const observerRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const region = tourData.categories.find(r => r.slug === regionSlug);
    const tour = region?.subcategories?.find(t => t.slug === tourSlug);

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
        const handleScroll = () => {
            const sections = ['overview', 'itinerary', 'included', 'essentials', 'gallery'];
            const headerOffset = 120;
            const scrollPosition = window.scrollY + headerOffset + 50;
            
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
    }, [regionSlug, tourSlug]);

    if (!tour || !region) {
        return (
            <div className="min-h-screen bg-[#fcf6f2] flex items-center justify-center">

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
                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200/50 shadow-sm">
                                    <FiStar className="text-yellow-500 text-base sm:text-lg" />
                                    <span className="text-xs sm:text-sm font-medium text-gray-800">{tour.rating || 4.5}</span>
                                    <span className="text-gray-600 text-xs sm:text-sm">({tour.reviews || 50}+)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4">
                                <button className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
                                    <span>Book This Tour</span>
                                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
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

            {/* Quick Stats Bar */}
            <div className="relative -pt-4 sm:-pt-6 pb-8 sm:pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                            <StatItem icon={<FiCalendar />} label="Tour Duration" value={tour.duration} />
                            <StatItem icon={<FiUsers />} label="Group Size" value="Small Groups" />
                            <StatItem icon={<FiHome />} label="Accommodation" value="Hotels & Resorts" />
                            <StatItem icon={<FiBriefcase />} label="Transport" value={tour.transport?.join(' + ') || 'Private Vehicle'} />
                            <StatItem icon={<FiWind />} label="Start Point" value="Kathmandu" />
                            <StatItem icon={<FiSun />} label="Meals" value="As per itinerary" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:w-2/3">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:block sticky top-24 z-40 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100 pb-8 lg:pb-12 rounded-xl shadow-sm">
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

                        {/* Mobile Navigation */}
                        <div className="lg:hidden sticky top-20 z-50 pb-6">
                            <div className="relative" ref={mobileMenuRef}>
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        {sections.find(s => s.id === activeSection)?.icon}
                                        <span className="font-medium text-gray-900 text-sm">
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
                                                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 ${activeSection === section.id
                                                        ? 'bg-[#1a365d] text-white'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {section.icon}
                                                <span className="font-medium text-sm">{section.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
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

                                    {/* Tour Tags */}
                                    {tour.tags && tour.tags.length > 0 && (
                                        <div className="pt-6 sm:pt-8 lg:pt-10">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-[#1a365d] pb-4 sm:pb-6">Tour Features</h3>
                                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                                {tour.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#f0e6dc] to-[#e8d9cc] text-gray-700 rounded-lg font-medium capitalize text-xs sm:text-sm">
                                                        {tag.replace('-', ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Itinerary */}
                            {tour.itinerary && (
                                <section id="itinerary" className="scroll-pt-28">
                                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 lg:pb-8 gap-3 sm:gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                                    <FiList className="text-white text-lg sm:text-xl" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">Itinerary</h2>
                                                    <p className="text-gray-600 text-sm">{tour.itinerary.length} days of exploration</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 text-[#2c5aa0] font-semibold hover:text-[#1a365d] transition-colors border border-[#2c5aa0] rounded-lg hover:bg-[#2c5aa0]/5 text-xs sm:text-sm">
                                                <FiDownload /> Download PDF
                                            </button>
                                        </div>

                                        <div className="space-y-3 sm:space-y-4">
                                            {tour.itinerary.map((day, idx) => (
                                                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
                                                    <button
                                                        onClick={() => toggleDay(idx)}
                                                        className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                                                    >
                                                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] flex items-center justify-center flex-shrink-0">
                                                                <span className="text-white font-bold text-sm sm:text-base lg:text-lg">Day {day.day}</span>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">{day.title}</h3>
                                                                <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm pt-1">
                                                                    {day.activities && day.activities.length > 0 && (
                                                                        <span className="flex items-center gap-1">
                                                                            <FiCheck className="w-3 h-3" /> {day.activities.length} activities
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

                                                    {expandedDays.includes(idx) && day.activities && (
                                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                                            <div className="pt-4 border-t border-gray-200">
                                                                <div className="space-y-2 sm:space-y-3">
                                                                    {day.activities.map((activity, activityIdx) => (
                                                                        <div key={activityIdx} className="flex items-start gap-2 sm:gap-3">
                                                                            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#2c5aa0]/10 flex items-center justify-center flex-shrink-0 pt-0.5 sm:pt-1">
                                                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2c5aa0]"></div>
                                                                            </div>
                                                                            <span className="text-gray-700 text-sm sm:text-base">{activity}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
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
                                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 pb-4 sm:pb-6 lg:pb-8">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                            <FiCheck className="text-white text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">What's Included</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                        <div className="space-y-4 sm:space-y-6">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-green-700 flex items-center gap-2">
                                                <FiCheck /> Included Services
                                            </h3>
                                            <div className="space-y-2 sm:space-y-3">
                                                {tour.inclusions.map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 pt-0.5 sm:pt-1">
                                                            <FiCheck className="text-green-600 text-xs sm:text-sm" />
                                                        </div>
                                                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-red-700 flex items-center gap-2">
                                                <FiX /> Not Included
                                            </h3>
                                            <div className="space-y-2 sm:space-y-3">
                                                {/* Common exclusions for tours if not specified in data */}
                                                {['International flights', 'Travel insurance', 'Personal expenses', 'Visa fees', 'Tips for guide and driver'].map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 pt-0.5 sm:pt-1">
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
                                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 pb-4 sm:pb-6 lg:pb-8">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                            <FiActivity className="text-white text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">Tour Essentials</h2>
                                    </div>
                                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                                        <div>
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 pb-3 sm:pb-4">Travel Requirements</h3>
                                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                                {[
                                                    "Valid Passport",
                                                    "Travel Insurance",
                                                    "Comfortable Shoes",
                                                    "Weather-appropriate Clothing",
                                                    "Camera",
                                                    "Personal Medication",
                                                    "Power Adapter",
                                                    "Day Pack"
                                                ].map((item, idx) => (
                                                    <div key={idx} className="p-2 sm:p-3 lg:p-4 bg-[#fcf6f2] rounded-xl border border-gray-200 hover:border-[#2c5aa0] transition-colors">
                                                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base">{item}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 pb-3 sm:pb-4">Tour Information</h3>
                                            <div className="bg-gradient-to-br from-[#fcf6f2] to-white rounded-xl p-4 sm:p-6 border border-gray-200">
                                                <div className="space-y-3 sm:space-y-4">
                                                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                                                        <span className="text-gray-600 text-sm sm:text-base">Tour Category</span>
                                                        <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{region.name}</span>
                                                    </div>
                                                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                                                        <span className="text-gray-600 text-sm sm:text-base">Difficulty Level</span>
                                                        <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{tour.difficulty || 'Easy'}</span>
                                                    </div>
                                                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                                                        <span className="text-gray-600 text-sm sm:text-base">Transport Type</span>
                                                        <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{tour.transport?.join(', ') || 'Private Vehicle'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 text-sm sm:text-base">Group Size</span>
                                                        <span className="font-semibold text-[#1a365d] text-sm sm:text-base">Small Groups (2-12)</span>
                                                    </div>
                                                </div>
                                            </div>
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
                                                <div key={idx} className="aspect-square rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer">
                                                    <img
                                                        src={img}
                                                        alt={`${tour.name} ${idx + 1}`}
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
                    <div className="lg:w-1/3 pt-6 sm:pt-8 lg:pt-0">
                        <div className="sticky top-32 space-y-4 sm:space-y-6">
                            {/* Price Card */}
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <div className="text-center pb-4 sm:pb-6 lg:pb-8">
                                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] pb-1 sm:pb-2">${tour.price}</div>
                                        <div className="text-gray-600 text-sm sm:text-base">per person ({tour.currency || 'USD'})</div>
                                    </div>

                                    <button className="w-full py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 pb-4 sm:pb-6 text-sm sm:text-base">
                                        Book Now
                                    </button>

                                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                        <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                                            <span className="text-gray-600 text-sm sm:text-base">Tour Duration</span>
                                            <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{tour.duration}</span>
                                        </div>

                                        <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                                            <span className="text-gray-600 text-sm sm:text-base">Difficulty</span>
                                            <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{tour.difficulty || 'Easy'}</span>
                                        </div>

                                        <div className="flex justify-between items-center py-2 sm:py-3">
                                            <span className="text-gray-600 text-sm sm:text-base">Transport</span>
                                            <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{tour.transport?.[0] || 'Private Vehicle'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#fcf6f2] border-t border-gray-200 p-3 sm:p-4 lg:p-6">
                                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                        <FiAlertCircle className="text-[#2c5aa0] text-sm sm:text-base" />
                                        <span className="text-xs sm:text-sm">Flexible booking and easy cancellation policy</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Facts */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 pb-3 sm:pb-4 lg:pb-6">
                                    <FiCompass className="text-[#2c5aa0]" />
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#1a365d]">Quick Facts</h3>
                                </div>
                                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                    <FactItem label="Duration" value={tour.duration} />
                                    <FactItem label="Transport" value={tour.transport?.join(', ') || 'Private Vehicle'} />
                                    <FactItem label="Difficulty" value={tour.difficulty || 'Easy'} />
                                    <FactItem label="Accommodation" value="Hotels & Resorts" />
                                    <FactItem label="Meals" value="As per itinerary" />
                                    <div>
                                        <div className="text-xs sm:text-sm text-gray-500 pb-1">Tour Type</div>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {tour.tags?.slice(0, 3).map((tag, idx) => (
                                                <span key={idx} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs capitalize">
                                                    {tag.replace('-', ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tour Highlights Card */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 pb-3 sm:pb-4 lg:pb-6">
                                    <FiStar className="text-[#2c5aa0]" />
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#1a365d]">Key Highlights</h3>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    {tour.highlights?.slice(0, 4).map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2c5aa0]/10 flex items-center justify-center flex-shrink-0 pt-0.5 sm:pt-1">
                                                <span className="text-[#2c5aa0] text-xs font-bold">{idx + 1}</span>
                                            </div>
                                            <span className="text-gray-700 text-xs sm:text-sm">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Tours */}
                <div className="pt-12 sm:pt-16 lg:pt-32 pt-6 sm:pt-8 lg:pt-16 border-t border-gray-200">
                    <div className="text-center pb-6 sm:pb-8 lg:pb-12">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d] pb-2 sm:pb-3 lg:pb-4">More Tours in {region.name}</h2>
                        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Discover other amazing tours in this category</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {region.subcategories
                            .filter(t => t.id !== tour.id)
                            .slice(0, 3)
                            .map((similarTour) => (
                                <Link
                                    key={similarTour.id}
                                    to={`/tours/${region.slug}/${similarTour.slug}`}
                                    className="group"
                                >
                                    <div className="aspect-video rounded-xl overflow-hidden pb-3 sm:pb-4 lg:pb-6">
                                        <img
                                            src={similarTour.images?.[0] || region.image}
                                            alt={similarTour.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 pb-1 sm:pb-2 group-hover:text-[#2c5aa0] transition-colors">
                                            {similarTour.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm pb-2 sm:pb-3 lg:pb-4 line-clamp-2">
                                            {similarTour.shortDescription}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="font-bold text-[#1a365d] text-sm sm:text-base">${similarTour.price}</div>
                                            <div className="flex items-center gap-1 text-[#2c5aa0] text-xs sm:text-sm font-semibold">
                                                View Details <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>

                    <div className="text-center pt-6 sm:pt-8 lg:pt-12">
                        <Link
                            to={`/tours/${region.slug}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-[#1a365d] text-white rounded-xl hover:bg-[#2c5aa0] transition-all duration-300 text-sm sm:text-base"
                        >
                            <FiCompass /> View All {region.name} Tours
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Booking Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-3 sm:p-4 z-40">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg sm:text-xl font-bold text-[#1a365d]">${tour.price}</div>
                        <div className="text-gray-600 text-xs sm:text-sm">{tour.duration}</div>
                    </div>
                    <button className="px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 bg-gradient-to-r from-[#2c5aa0] to-[#1a365d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
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
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-xl bg-[#fcf6f2] flex items-center justify-center mx-auto pb-1 sm:pb-2 lg:pb-3 text-[#2c5aa0]">
            {icon}
        </div>
        <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider pb-0.5 sm:pb-1">{label}</div>
        <div className="font-semibold text-[#1a365d] text-xs sm:text-sm">{value}</div>
    </div>
);

const FactItem = ({ label, value }) => (
    <div className="flex items-start justify-between py-1 sm:py-2 border-b border-gray-100 last:border-0">
        <span className="text-gray-600 text-xs sm:text-sm">{label}</span>
        <span className="font-medium text-gray-900 text-right max-w-[60%] text-xs sm:text-sm">{value}</span>
    </div>
);

export default ToursDetail;