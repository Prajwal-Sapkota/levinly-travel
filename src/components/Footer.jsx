import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronRight,
  FaHandshake,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const partners = [
    "/images/partner1.jpg",
    "/images/partner2.jpg",
    "/images/partner3.jpg",
    "/images/partner4.jpg",
    "/images/partner5.jpg",
  ];
  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", url: "#" },
    { icon: FaInstagram, label: "Instagram", url: "#" },
    { icon: FaYoutube, label: "YouTube", url: "#" },
    { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
  ];

  const tours = ["Nepal", "India", "Tibet", "Thailand", "Singapore"];

  return (
    <footer className="bg-[#0b3d63] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 lg:pt-20">
        {/* Main Content - Stack on mobile, grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-14">

          {/* Left Column - Partners & Tours */}
          <div className="space-y-8 md:space-y-10">
            {/* Partners Section */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FaHandshake className="text-[#6dc5f1] w-4 h-4 sm:w-5 sm:h-5" />
                <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide">
                  WE'RE AFFILIATED WITH
                </h3>
              </div>

              {/* Partners Logos - Horizontal scroll on mobile */}
              <div className="flex flex-row pb-2 md:pb-0 gap-3 md:gap-0 ">
                {partners.map((logo, i) => (
                  <img
                    key={i}
                    src={logo}
                    alt={`Partner ${i + 1}`}
                    className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 object-contain "
                  />
                ))}
              </div>
            </div>

            {/* Tours Section */}
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 tracking-wide">
                TOURS
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {tours.map((country) => (
                  <Link
                    key={country}
                    to="#"
                    className="flex items-center text-white/80 text-sm sm:text-base
                               hover:text-[#6dc5f1] transition group"
                  >
                    <FaChevronRight className="text-xs mr-2 group-hover:translate-x-1 transition-transform" />
                    {country}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Logo & Social */}
          <div className="flex flex-col items-center order-first lg:order-none">
            {/* Logo */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white rounded-full
                            flex items-center justify-center
                            shadow-lg md:shadow-2xl mb-6 md:mb-8">
              <img
                src="/images/logo2.png"
                alt="Levinly Travel Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
              />
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h4 className="text-xs sm:text-sm uppercase tracking-widest text-white/70">
                Follow Us
              </h4>

              <div className="flex gap-2 sm:gap-3 md:gap-4">
                {socialLinks.map(({ icon: Icon, label, url }) => (
                  <Link
                    key={label}
                    to={url}
                    aria-label={label}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11
                 rounded-full flex items-center justify-center
                 bg-white/10 border border-white/20
                 hover:bg-[#6dc5f1]
                 hover:text-[#0b3d63]
                 transition-all duration-300 text-sm sm:text-base"
                  >
                    <Icon aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Reminder */}
          <div className="bg-white/10 backdrop-blur rounded-lg md:rounded-xl
                          p-4 sm:p-5 md:p-6 border border-white/20 shadow-md md:shadow-lg">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide mb-3 sm:mb-4">
              FRIENDLY REMINDER
            </h3>

            <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
              Before confirming your reservation, we want to share an important
              thought. Exploring new travel experiences can be surprising, but
              often, the best memories come from overcoming challenges with
              fellow travelers. To ensure you have the best experience, we
              recommend scheduling a meeting with our team to learn more about
              our tours and travel plans. We want you to feel informed and
              excited about your adventure!
            </p>
          </div>
        </div>

        {/* Contact Info - Stack on mobile, grid on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-8 md:py-10 lg:py-12">

          {/* Location */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-[#6dc5f1] w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="font-medium text-sm sm:text-base">Location</h4>
              <p className="text-white/70 text-sm">
                Naya Bazar 17, Kathmandu 44600, Nepal
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-[#6dc5f1] w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="font-medium text-sm sm:text-base">Contact</h4>

              <Link
                to={{ pathname: "tel:+9779701562819" }}
                className="block py-2 px-1 text-white/70 text-sm  hover:text-[#6dc5f1] transition"
              >
                +977 9701562819
              </Link>

              <Link
                to={{ pathname: "tel:+9779866298333" }}
                className="block px-1 text-white/70 text-sm  hover:text-[#6dc5f1] transition"
              >
                +977 9866298333
              </Link>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="text-[#6dc5f1] w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="font-medium text-sm sm:text-base">Email</h4>

              <Link
                to={{ pathname: "mailto:levinlytravel2024@gmail.com" }}
                className="block py-2 px-1 text-white/70 text-sm break-words hover:text-[#6dc5f1] transition"
              >
                levinlytravel2024@gmail.com
              </Link>

              <Link
                to={{ pathname: "mailto:info@levinlytravel.com" }}
                className="block px-1 text-white/70 text-sm break-words hover:text-[#6dc5f1] transition"
              >
                info@levinlytravel.com
              </Link>
            </div>
          </div>

        </div>
        {/* Copyright */}
        <div className="pt-6 md:pt-8 border-t border-white/20 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} Levinly Travel. All rights reserved.
          </p>
          <p className="text-gray-300 text-xs sm:text-sm py-1">
            Crafted By{" "}
            <Link
              to="https://www.sait.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#6dc5f1] transition-colors duration-300"
            >
              S.A.I.T Solution Nepal
            </Link>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;