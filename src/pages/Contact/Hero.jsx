import React, { useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Text animation
    if (textRef.current) {
      textRef.current.style.opacity = "0";
      textRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        textRef.current.style.transition = "all 0.8s ease";
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }, 200);
    }

    // Image animation
    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      imageRef.current.style.transform = "translateX(20px)";
      setTimeout(() => {
        imageRef.current.style.transition = "all 0.8s ease 0.3s";
        imageRef.current.style.opacity = "1";
        imageRef.current.style.transform = "translateX(0)";
      }, 400);
    }

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.transition = `all 0.6s ease ${0.5 + index * 0.1}s`;
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 600 + index * 100);
      }
    });
  }, []);

  const contactInfo = [
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Call Us",
      details: ["+977 9701562819", "+977 9866298333"],
      color: "from-blue-50 to-white",
      iconColor: "text-[#6dc5f1]",
      clickable: true,
      link: "tel:+9779701562819",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email Us",
      details: ["info@levinlytravel.com", "levinlytravel2024@gmail.com"],
      color: "from-[#f8fafc] to-white",
      iconColor: "text-[#6dc6f2]",
      clickable: true,
      link: "mailto:info@levinlytravel.com",
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Visit Us",
      details: ["Naya Bazar 17", "Kathmandu 44600, Nepal"],
      color: "from-blue-50 to-white",
      iconColor: "text-[#6dc5f1]",
      clickable: true,
      link: "https://maps.google.com/?q=27.722904846630794,85.30473886086841",
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Office Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat: 10AM-4PM"],
      color: "from-[#f8fafc] to-white",
      iconColor: "text-[#6dc6f2]",
      clickable: false,
    },
  ];

  const handleContactClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <section className="relative bg-[#fcf6f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 lg:pt-32">
        {/* Hero Content - Stack on mobile */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pb-12 lg:pb-20">

          {/* Left Content */}
          <div ref={textRef} className="lg:pr-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#0b1c3d] pb-4 lg:pb-6 leading-tight">
              Let's Start Your Next Adventure Together
            </h1>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed pb-6 lg:pb-8 max-w-xl">
              Our travel experts are here to help you plan the perfect journey.
              Whether you need advice, custom itineraries, or just want to chat
              about travel possibilities, we're ready to assist.
            </p>

            <button className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 text-sm sm:text-base mb-6 sm:mb-8">
              Schedule a Consultation
              <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative order-first lg:order-last">
            {/* Background accent - Hidden on mobile */}
            <div className="absolute -right-2 lg:-right-4 -top-2 lg:-top-4 w-full h-full bg-gradient-to-br from-blue-50 to-transparent rounded-lg lg:rounded-2xl hidden sm:block" />

            {/* Main image */}
            <div
              ref={imageRef}
              className="relative rounded-lg lg:rounded-xl overflow-hidden shadow-lg lg:shadow-xl"
            >
              <img
                src="/images/contacthero.jpg"
                alt="Travel consultation"
                className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c3d]/20 via-transparent to-transparent" />
            </div>

            {/* Stats badge - Smaller on mobile */}
            <div className="absolute -bottom-3 lg:-bottom-4 -left-3 lg:-left-4 bg-white rounded-lg lg:rounded-xl p-3 lg:p-5 shadow-lg lg:shadow-xl border border-gray-100">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-3 bg-[#6dc5f1] rounded-md lg:rounded-lg">
                  <div className="text-white font-bold text-sm lg:text-lg">24/7</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-gray-900 text-sm lg:text-base">Support</div>
                  <div className="text-[10px] lg:text-xs text-gray-500">Always Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Cards - 2 columns on mobile, 4 on desktop */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="group relative"
              >
                <div
                  onClick={() => info.clickable && handleContactClick(info.link)}
                  className={`bg-gradient-to-b ${info.color} rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:hover:-translate-y-2 h-full cursor-pointer ${info.clickable ? 'hover:border-[#6dc5f1]/30 active:scale-[0.98]' : ''}`}
                >
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className={`p-2 lg:p-3 ${info.iconColor} bg-white rounded-md lg:rounded-lg shadow-sm group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-gray-900 text-sm lg:text-base pb-1 lg:pb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className={`text-xs lg:text-sm text-gray-600 pb-1 last:pb-0 ${info.clickable ? 'hover:text-[#6dc5f1] transition-colors' : ''}`}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Hover line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 lg:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#6dc5f1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;