import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import ToursDropdown from "./dropdown/tours";
import TrekkingDropdown from "./dropdown/trekking";
import toursData from "../data/tour.json";
import trekkingData from "../data/trekking.json";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const dropdownRef = useRef(null);
  const logoRef = useRef(null);
  const leftMenuRefs = useRef([]);
  const rightMenuRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  // Animation effect on mount - runs only once
  useEffect(() => {
    if (hasAnimated) return;

    setTimeout(() => {
      // Logo animation - KEEPING YOUR ORIGINAL SCROLL ANIMATION
      if (logoRef.current) {
        logoRef.current.style.transform = 'translateY(-20px)';
        logoRef.current.style.opacity = '0';

        setTimeout(() => {
          logoRef.current.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
          logoRef.current.style.transform = 'translateY(0)';
          logoRef.current.style.opacity = '1';
        }, 200);
      }

      // Left menu items animation
      leftMenuRefs.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateY(-15px)';
          item.style.opacity = '0';

          setTimeout(() => {
            item.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
          }, 300 + (index * 100)); // Stagger effect
        }
      });

      // Right menu items animation
      rightMenuRefs.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateY(-15px)';
          item.style.opacity = '0';

          setTimeout(() => {
            item.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
          }, 300 + (index * 100)); // Stagger effect
        }
      });

      setHasAnimated(true);
    }, 100);
  }, [hasAnimated]);

  return (
    <header
      ref={dropdownRef}
      className={`
        fixed top-0 left-0 w-full z-50 bg-[#fdf7f3] 
        transition-all duration-300
        ${scrolled ? 'border-b border-[#eee2d8]' : ''}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="bg-[#fdf7f3] px-3 py-2 rounded-b-full border-x border-b border-[#eee2d8]">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img src="/images/logo1.png" alt="Travel Logo" className="h-14" />
              </Link>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 border border-[#eee2d8] bg-white shadow-lg rounded-full hover:scale-105 transition-transform"
          >
            {mobileOpen ? <FiX size={22} className="text-gray-700" /> : <FiMenu size={22} className="text-gray-700" />}
          </button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 items-center h-24">
          {/* LEFT MENU */}
          <ul className="flex justify-start gap-12 text-[13px] tracking-[0.28em] text-gray-600 items-center ">
            <li
              ref={el => leftMenuRefs.current[0] = el}
              className="group"
              style={hasAnimated ? {} : { opacity: 0, transform: 'translateY(-15px)' }}
            >
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="relative py-1 inline-block align-middle leading-[normal]">
                HOME
                <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-gray-800 group-hover:w-full transition-all" />
              </Link>
            </li>

            {/* TOURS */}
            <li
              ref={el => leftMenuRefs.current[1] = el}
              className="group relative flex items-center gap-1"
              onMouseEnter={() => setActiveDropdown("tours")}
              onMouseLeave={() => setActiveDropdown(null)}
              style={hasAnimated ? {} : { opacity: 0, transform: 'translateY(-15px)' }}
            >
              <Link to="/tours" onClick={() => window.scrollTo(0, 0)} className="relative py-1 inline-block align-middle leading-[normal]">
                TOURS
                <span className={`absolute left-0 -bottom-0.5 h-[1px] bg-gray-800 transition-all duration-300 ${activeDropdown === "tours" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
              <FiChevronDown className={`w-3 h-3 ml-1 transition-all duration-300 ${activeDropdown === "tours" ? "rotate-180 text-gray-800" : "text-gray-600"}`} />
              {activeDropdown === "tours" && (
                <div className="absolute top-full left-1/2 -translate-x-[18%] pt-6">
                  <ToursDropdown onClose={() => setActiveDropdown(null)} />
                </div>
              )}            </li>

            {/* TREKKING */}
            <li
              ref={el => leftMenuRefs.current[2] = el}
              className="group relative flex items-center gap-1"
              onMouseEnter={() => setActiveDropdown("trekking")}
              onMouseLeave={() => setActiveDropdown(null)}
              style={hasAnimated ? {} : { opacity: 0, transform: 'translateY(-15px)' }}
            >
              <Link to="/trekking" onClick={() => window.scrollTo(0, 0)} className="relative py-1 inline-block align-middle leading-[normal]">
                TREKKING
                <span className={`absolute left-0 -bottom-0.5 h-[1px] bg-gray-800 transition-all duration-300 ${activeDropdown === "trekking" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
              <FiChevronDown className={`w-3 h-3 ml-1 transition-all duration-300 ${activeDropdown === "trekking" ? "rotate-180 text-gray-800" : "text-gray-600"}`} />
              {activeDropdown === "trekking" && (
                <div className="absolute top-full left-1/2 -translate-x-[24%] pt-6">
                  <TrekkingDropdown onClose={() => setActiveDropdown(null)} />
                </div>
              )}
            </li>
          </ul>

          {/* CENTER LOGO - KEEPING YOUR ORIGINAL SCROLL ANIMATION */}
          <div className="flex justify-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>

              <div className="relative">
                <div
                  ref={el => {
                    logoRef.current = el;
                    // Only set initial styles if not animated yet
                    if (el && !hasAnimated) {
                      el.style.opacity = '0';
                      el.style.transform = 'translateY(-20px)';

                      // Remove the inline styles after animation
                      setTimeout(() => {
                        el.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';

                        // After animation completes, remove inline styles so Tailwind classes work
                        setTimeout(() => {
                          el.style.transition = '';
                          el.style.opacity = '';
                          el.style.transform = '';
                        }, 600);
                      }, 200);
                    }
                  }}
                  className={`relative bg-[#fdf7f3] px-4 rounded-b-full border-x border-b border-[#eee2d8] transition-all duration-500 ease-out ${scrolled ? "translate-y-2 py-4" : "py-2"}`}
                >
                  <img src="/images/logo1.png" alt="Travel Logo" className="h-20 transition-all duration-500 ease-out" />
                </div>

                {/* KEEPING YOUR ORIGINAL GRADIENT EFFECT - ADJUSTED */}
                <div className={`absolute inset-0 rounded-b-full bg-gradient-to-b from-[#eee2d8]/30 via-transparent to-transparent transition-all duration-500 ${scrolled ? "translate-y-2 opacity-100" : "opacity-0"}`} />
              </div>
            </Link>
          </div>

          {/* RIGHT MENU */}
          <ul className="flex justify-end gap-12 text-[13px] tracking-[0.28em] text-gray-600 items-center">
            {["ABOUT US", "BLOGS", "CONTACT"].map((item, index) => (
              <li
                key={item}
                ref={el => rightMenuRefs.current[index] = el}
                className="group"
                style={hasAnimated ? {} : { opacity: 0, transform: 'translateY(-15px)' }}
              >
                <Link to={`/${item.toLowerCase().replace(" ", "-")}`} onClick={() => window.scrollTo(0, 0)} className="relative py-1 inline-block align-middle leading-[normal]">
                  {item}
                  <span className="absolute right-0 -bottom-0.5 h-[1px] w-0 bg-gray-800 group-hover:w-full transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Screen Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-[#fcf6f2]">
            {/* Header with Logo and Close Button */}
            <div className="p-6 border-b border-[#eee2d8]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-[#fdf7f3] px-3 py-2 rounded-b-full border-x border-b border-[#eee2d8]">
                    <Link to="/" onClick={() => { window.scrollTo(0, 0); setMobileOpen(false); }}>
                      <img src="/images/logo1.png" alt="Travel Logo" className="h-12" />
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 border border-[#eee2d8] bg-white shadow-lg rounded-full hover:scale-105 transition-transform"
                >
                  <FiX size={20} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="p-6 h-[calc(100vh-120px)] overflow-y-auto">
              {/* HOME */}
              <Link
                to="/"
                onClick={() => { window.scrollTo(0, 0); setMobileOpen(false); }}
                className="w-full p-5 text-left border-b border-[#eee2d8] hover:bg-gray-50 transition-colors block opacity-0 animate-[fadeIn_0.3s_ease-out_0.1s_forwards]"
              >
                <span className="text-lg font-medium text-gray-800">HOME</span>
              </Link>

              {/* TOURS Section */}
              <div className="border-b border-[#eee2d8] opacity-0 animate-[fadeIn_0.3s_ease-out_0.2s_forwards]">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === "TOURS" ? null : "TOURS")}
                  className="w-full p-5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-gray-800">TOURS</span>
                  <FiChevronDown className={`text-gray-500 transition-transform ${mobileSubmenu === "TOURS" ? "rotate-180" : ""}`} />
                </button>

                {/* TOURS Submenu */}
                {mobileSubmenu === "TOURS" && (
                  <div className="bg-gray-50/50">
                    {toursData.categories.map((category, index) => (
                      <Link
                        key={category.id}
                        to={`/tours/${category.slug}`}
                        onClick={() => { window.scrollTo(0, 0); setMobileOpen(false); }}
                        className="block p-4 border-b border-[#eee2d8]/30 hover:bg-white transition-colors opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-base font-medium text-gray-800">{category.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{category.duration}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* TREKKING Section */}
              <div className="border-b border-[#eee2d8] opacity-0 animate-[fadeIn_0.3s_ease-out_0.3s_forwards]">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === "TREKKING" ? null : "TREKKING")}
                  className="w-full p-5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-gray-800">TREKKING</span>
                  <FiChevronDown className={`text-gray-500 transition-transform ${mobileSubmenu === "TREKKING" ? "rotate-180" : ""}`} />
                </button>

                {/* TREKKING Submenu */}
                {mobileSubmenu === "TREKKING" && (
                  <div className="bg-gray-50/50">
                    {trekkingData.regions.map((region, index) => (
                      <Link
                        key={region.id}
                        to={`/trekking/${region.slug}`}
                        onClick={() => { window.scrollTo(0, 0); setMobileOpen(false); }}
                        className="block p-4 border-b border-[#eee2d8]/30 hover:bg-white transition-colors opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-base font-medium text-gray-800">{region.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{region.difficultyRange}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              {["ABOUT US", "BLOGS", "CONTACT"].map((item, index) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => { window.scrollTo(0, 0); setMobileOpen(false); }}
                  className="w-full p-5 text-left border-b border-[#eee2d8] hover:bg-gray-50 transition-colors block opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
                  style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}
                >
                  <span className="text-lg font-medium text-gray-800">{item}</span>
                </Link>
              ))}
            </div>
            <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;