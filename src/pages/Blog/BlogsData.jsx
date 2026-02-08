import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaClock, FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";
import blogData from "../../data/blog.json";
import { Link } from "react-router-dom";

const BlogData = () => {
    const [blogs, setBlogs] = useState([]);
    const [animate, setAnimate] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Load blogs (filter only published)
        const publishedBlogs = blogData.blogs.filter((b) => b.published);
        setBlogs(publishedBlogs);
    }, []);

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
        <section ref={sectionRef} className="relative bg-[#fcf6f2] py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0b1c3d] pb-4">
                        Our Travel Stories
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 sm:px-0">
                        Dive deeper into our collection of travel experiences, expert guides, and cultural insights
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {blogs.map((blog, index) => (
                        <article
                            key={blog.id}
                            className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full"
                            style={{
                                opacity: animate ? 1 : 0,
                                transform: animate ? 'translateY(0)' : 'translateY(40px)',
                                transition: `all 600ms ease ${index * 100}ms`,
                            }}
                        >
                            <div className="absolute top-4 left-4 z-10">
                                <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                                    <FaTag className="w-3 h-3 text-[#6dc5f1]" />
                                    <span className="text-xs font-semibold text-[#0b1c3d]">{blog.category}</span>
                                </div>
                            </div>

                            <div className="relative h-56 sm:h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c3d]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="p-5 sm:p-6 flex flex-col flex-grow relative">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2 sm:gap-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                            <FaCalendarAlt className="w-3 h-3 text-[#6dc5f1]" />
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                            <FaClock className="w-3 h-3 text-[#6dc5f1]" />
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-[#0b1c3d] font-medium">
                                        <FaUser className="w-3 h-3" />
                                        <span>{blog.author}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-[#0b1c3d] pb-3 group-hover:text-[#0b1c3d]/90 transition-colors duration-300 line-clamp-2 min-h-[3.5rem] sm:min-h-[3.5rem]">
                                    {blog.title}
                                </h3>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/blogs/${blog.slug}`}
                                        className="group inline-flex items-center justify-between w-full"
                                    >
                                        {/* Text */}
                                        <span className="text-sm font-semibold text-[#6dc5f1] group-hover:text-[#0b1c3d] transition-colors duration-300">
                                            Read Full Story
                                        </span>

                                        {/* Arrow Button */}
                                        <div className="flex items-center justify-center w-8 h-8 bg-[#6dc5f1] rounded-full transition-colors duration-300 group-hover:bg-[#0b1c3d]">
                                            <FaArrowRight className="w-3 h-3 text-white group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </Link>
                                </div>

                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#6dc5f1]/10 rounded-xl md:rounded-2xl pointer-events-none transition-all duration-500" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogData;