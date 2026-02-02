import React, { useEffect, useRef, useState } from "react";
import blogsData from "../data/blog.json";
import { FaArrowRight, FaClock, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const LatestBlogs = () => {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    
    const latestBlogs = [...blogsData.blogs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    // Scroll animation trigger
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || animate) return;
            
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setAnimate(true);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animate]);

    return (
        <section ref={sectionRef} className="bg-[#fcf6f2] pb-6 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                {/* Section Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#0b1c3d] pb-8 md:pb-8 lg:pb-12">
                    Latest Blogs
                </h1>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {latestBlogs.map((blog, index) => (
                        <article
                            key={blog.id}
                            className="group relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col"
                            style={{
                                opacity: animate ? 1 : 0,
                                transform: animate ? 'translateY(0)' : 'translateY(40px)',
                                transition: `all 600ms ease ${index * 150}ms`,
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Content Container */}
                            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative">
                                {/* Date */}
                                <div className="flex items-center justify-center text-gray-600 mb-2 sm:mb-3">
                                    <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#6dc5f1]" />
                                    <span className="text-xs sm:text-sm font-medium">{blog.date}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0b1c3d] mb-2 sm:mb-3 md:mb-4 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]">
                                    {blog.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6 line-clamp-2 sm:line-clamp-3 flex-grow">
                                    {blog.excerpt || "Discover amazing travel insights and stories..."}
                                </p>

                                {/* Read Time and Author */}
                                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                                    <div className="flex items-center">
                                        <FaClock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        <span>{blog.readTime || "5 min read"}</span>
                                    </div>
                                    <span className="font-medium text-[#0b1c3d] text-xs sm:text-sm">
                                        {blog.author || "Levilyn Travel"}
                                    </span>
                                </div>

                                {/* Hover: Read More Button */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 bg-gradient-to-t from-white via-white to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                    <button className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#0b1c3d] text-white text-xs sm:text-sm md:text-base font-semibold rounded-full hover:bg-[#6dc5f1] hover:scale-105 transition-all duration-300 shadow-md md:shadow-lg">
                                        Read Full Story
                                        <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Blogs Button */}
                <div 
                    className="mt-8 sm:mt-12 md:mt-16 lg:mt-20"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 600ms ease 900ms',
                    }}
                >
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#6dc5f1] text-white text-sm sm:text-base md:text-lg rounded-full font-medium hover:bg-[#0b1c3d] hover:text-[#6dc5f1] transition-all duration-300 shadow-md md:shadow-lg hover:shadow-xl"
                    >
                        View All Blogs
                        <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;