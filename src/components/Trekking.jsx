import React, { useEffect, useRef, useState } from "react";
import trekkingData from "../data/trekking.json";

const Trekking = () => {
    const { regions } = trekkingData;
    const sectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Scroll animation trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <section 
            ref={sectionRef}
            className="pb-12 md:pb-18 pt-12 md:pt-0 bg-[#fcf6f2]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header - Mobile optimized */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#0b1c3d] pt-4 md:pt-6">
                        Trekking Destinations
                    </h1>
                </div>

                {/* Destinations Grid - Mobile responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 ">
                    {regions.map((region, index) => {
                        // Animation style for each card
                        const animationStyle = {
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translate(0, 0)" : 
                                index % 4 === 0 ? "translateX(-50px) translateY(-30px)" :
                                index % 4 === 1 ? "translateX(50px) translateY(-30px)" :
                                index % 4 === 2 ? "translateX(-50px) translateY(30px)" :
                                "translateX(50px) translateY(30px)",
                            transition: `all 700ms ease ${index * 100}ms`,
                        };

                        return (
                            <div
                                key={region.id}
                                className="group relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                                style={animationStyle}
                            >
                                {/* Background Image */}
                                <img
                                    src={region.image}
                                    alt={region.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        {region.name}
                                    </h3>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl sm:rounded-3xl transition-all duration-500"></div>

                                {/* Subtle Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B4DBA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Trekking;