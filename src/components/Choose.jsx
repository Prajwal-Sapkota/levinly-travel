import React, { useEffect, useRef, useState } from 'react';
import {
    FaRoute,
    FaLeaf,
    FaSyncAlt,
    FaUserFriends,
    FaEye,
    FaHeart
} from 'react-icons/fa';

const Choose = () => {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);

    // Simple scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || animate) return;
            
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Trigger when section is 20% in viewport
            if (rect.top < windowHeight * 0.8) {
                setAnimate(true);
            }
        };

        // Check on load
        handleScroll();
        
        // Listen to scroll
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animate]);

    const features = [
        {
            icon: <FaRoute />,
            title: "Exclusive Travel Plan",
            description:
                "We'll create a personalized itinerary to make your journey unforgettable. Every route is thoughtfully designed just for you."
        },
        {
            icon: <FaLeaf />,
            title: "Ethical Tourism",
            description:
                "We protect nature, respect cultures, and support local communities through responsible and sustainable travel."
        },
        {
            icon: <FaSyncAlt />,
            title: "Total Flexibility",
            description:
                "Your journey, your rhythm. We adapt plans to your needs while keeping the experience authentic."
        },
        {
            icon: <FaUserFriends />,
            title: "Experienced Team",
            description:
                "Our leaders are seasoned travelers who guide with passion, care, and deep regional knowledge."
        },
        {
            icon: <FaEye />,
            title: "Trusted Supervision",
            description:
                "From start to finish, our team ensures seamless coordination and complete peace of mind."
        },
        {
            icon: <FaHeart />,
            title: "Travel Companions",
            description:
                "We don't just guide trips — we share experiences, stories, and unforgettable moments with you."
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative pt-12 md:pt-18 bg-[#f9f6f2] overflow-hidden"
        >
            {/* Ambient Background Shapes */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#6dc5f1]/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center pb-12 md:pb-18">
                    <h1 className="text-3xl md:text-4xl font-serif text-[#0b1c3d] pt-4 md:pt-6">
                        Why Choose Us?
                    </h1>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-lg transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-xl md:hover:shadow-2xl"
                            style={{
                                opacity: animate ? 1 : 0,
                                transform: animate 
                                    ? 'translateY(0) scale(1)' 
                                    : `translateY(${20 + (index * 5)}px) scale(0.98)`,
                                transition: `all 600ms ease ${index * 80}ms`,
                            }}
                        >
                            {/* Index */}
                            <span className="absolute -top-5 md:-top-6 right-6 text-5xl md:text-6xl font-extrabold text-gray-100 transition-colors duration-500 group-hover:text-gray-200">
                                0{index + 1}
                            </span>

                            {/* Icon */}
                            <div 
                                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#0B4DBA] to-[#6dc5f1] flex items-center justify-center text-white text-xl md:text-2xl shadow-md mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    transform: animate ? 'scale(1)' : 'scale(0.7)',
                                    opacity: animate ? 1 : 0,
                                    transition: `all 500ms ease ${index * 80 + 200}ms`,
                                }}
                            >
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover Accent Line */}
                            <div className="absolute bottom-2 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-[#0B4DBA] to-[#6dc5f1] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Choose;