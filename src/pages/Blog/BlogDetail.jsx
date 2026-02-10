import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiCalendar,
    FiUser,
    FiClock,
    FiTag,
    FiShare2,
    FiFacebook,
    FiTwitter,
    FiLinkedin,
    FiInstagram,
    FiBookmark,
    FiHeart,
    FiMessageSquare,
    FiArrowRight,
    FiChevronRight,
    FiEye,
    FiPrinter,
    FiMail,
    FiEdit,
    FiBookOpen,
    FiChevronsRight,
    FiHome,
    FiMapPin,
    FiStar,
    FiTrendingUp,
    FiCamera,
    FiGlobe,
    FiNavigation
} from "react-icons/fi";
import blogData from "../../data/blog.json";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const foundBlog = blogData.blogs.find(b => b.slug === slug && b.published);

        if (foundBlog) {
            setBlog(foundBlog);

            const related = blogData.blogs
                .filter(b => b.id !== foundBlog.id && b.published)
                .slice(0, 4);
            setRelatedBlogs(related);
        }

        setLoading(false);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcf6f2] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2c5aa0]"></div>
                    <p className="pt-4 text-gray-600">Loading blog post...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#fcf6f2]">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32 text-center">
                    <h1 className="text-3xl font-serif text-[#1a365d] pb-6">Blog Not Found</h1>
                    <p className="text-gray-600 pb-8 max-w-md mx-auto">The blog post you're looking for doesn't exist or has been moved.</p>
                    <Link
                        to="/blogs"
                        onClick={()=>{window.scrollTo(0,0);}}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-xl hover:bg-[#2c5aa0] transition-all duration-300"
                    >
                        <FiArrowLeft /> Back to Blogs
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const renderContent = (content) => {
        if (!content.body) return null;

        return content.body.map((section, index) => {
            switch (section.type) {
                case 'paragraph':
                    return (
                        <p key={index} className="text-gray-700 leading-relaxed pb-6">
                            {section.content}
                        </p>
                    );
                case 'subheading':
                    return (
                        <h3 key={index} className="text-2xl font-serif text-[#1a365d] pt-10 pb-6 pb-3 border-b border-gray-200">
                            {section.content}
                        </h3>
                    );
                case 'quote':
                    return (
                        <div key={index} className="my-10">
                            <div className="relative pl-6 sm:pl-8 border-l-4 border-[#2c5aa0]">
                                <p className="text-lg sm:text-xl italic text-gray-700 pb-3 sm:pb-4">"{section.content}"</p>
                                {section.author && (
                                    <p className="text-gray-600 font-medium">— {section.author}</p>
                                )}
                            </div>
                        </div>
                    );
                case 'tip':
                    return (
                        <div key={index} className="my-10 bg-gradient-to-br from-[#fcf6f2] to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                            <h4 className="text-lg font-semibold text-[#1a365d] pb-3 sm:pb-4 flex items-center gap-2">
                                <FiStar className="text-[#2c5aa0]" /> {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2c5aa0]/10 flex items-center justify-center flex-shrink-0 pt-0.5">
                                            <FiChevronsRight className="text-[#2c5aa0] w-3 h-3" />
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#fcf6f2]">
            <Navbar />

            {/* Hero Section - Like your trekking/tour pages */}
            <section className="relative bg-[#fcf6f2]">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        {/* Left Column */}
                        <div className="order-2 lg:order-1">
                            {/* Category & Author */}


                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-tight text-gray-900 pb-4 sm:pb-6">
                                {blog.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-gray-600 text-base leading-relaxed pb-6 sm:pb-8">
                                {blog.excerpt}
                            </p>



                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 ${isLiked ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-white text-gray-700 border border-gray-300 hover:border-[#2c5aa0]'}`}
                                >
                                    <FiHeart className={`${isLiked ? 'fill-red-600' : ''}`} />
                                    <span className="text-sm sm:text-base">{isLiked ? 'Liked' : 'Like'} {blog.likes}</span>
                                </button>
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 ${isBookmarked ? 'bg-[#2c5aa0] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-[#2c5aa0]'}`}
                                >
                                    <FiBookmark className={`${isBookmarked ? 'fill-white' : ''}`} />
                                    <span className="text-sm sm:text-base">{isBookmarked ? 'Saved' : 'Save'}</span>
                                </button>

                            </div>
                        </div>

                        {/* Featured Image - Right Column */}
                        <div className="relative order-1 lg:order-2">
                            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-4 sm:border-8 border-white">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#2c5aa0]/10 via-transparent to-transparent" />
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-56 sm:h-64 md:h-72 lg:h-[380px] xl:h-[420px] object-cover"
                                />
                                <div className="absolute bottom-4 right-4">
                                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                                        Photo by {blog.author}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats Bar */}
            <div className="relative -pt-4 sm:-pt-6 pb-6 sm:pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            <div className="text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fcf6f2] flex items-center justify-center mx-auto pb-2 sm:pb-3 text-[#2c5aa0]">
                                    <FiCalendar />
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider pb-1">Published</div>
                                <div className="font-semibold text-[#1a365d] text-sm sm:text-base">{blog.date}</div>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fcf6f2] flex items-center justify-center mx-auto pb-2 sm:pb-3 text-[#2c5aa0]">
                                    <FiClock />
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider pb-1">Read Time</div>
                                <div className="font-semibold text-[#1a365d] text-sm sm:text-base">{blog.readTime}</div>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fcf6f2] flex items-center justify-center mx-auto pb-2 sm:pb-3 text-[#2c5aa0]">
                                    <FiTrendingUp />
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider pb-1">Popularity</div>
                                <div className="font-semibold text-[#1a365d] text-sm sm:text-base">{blog.views} views</div>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fcf6f2] flex items-center justify-center mx-auto pb-2 sm:pb-3 text-[#2c5aa0]">
                                    <FiMessageSquare />
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider pb-1">Engagement</div>
                                <div className="font-semibold text-[#1a365d] text-sm sm:text-base">{blog.comments} comments</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                    {/* Main Content Column */}
                    <div className="lg:w-2/3">
                        {/* Introduction Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm pb-6 sm:pb-8 mb-6 sm:mb-8">
                            <div className="flex items-center gap-3 pb-4 sm:pb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                    <FiBookOpen className="text-white text-lg sm:text-xl" />
                                </div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">
                                    Introduction
                                </h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg pb-6 sm:pb-8">
                                {blog.content.introduction}
                            </p>

                            {/* Tags Preview */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                {blog.tags.slice(0, 3).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-[#fcf6f2] text-gray-700 rounded-lg text-xs sm:text-sm font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                                {blog.tags.length > 3 && (
                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs sm:text-sm font-medium">
                                        +{blog.tags.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm pb-6 sm:pb-8 mb-6 sm:mb-8">
                            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                                {renderContent(blog.content)}
                            </div>

                            {/* Conclusion */}
                            {blog.content.conclusion && (
                                <div className="pt-8 sm:pt-10 border-t border-gray-200 mt-8 sm:mt-10">
                                    <div className="flex items-center gap-3 pb-4 sm:pb-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1a365d] flex items-center justify-center">
                                            <FiEdit className="text-white text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">
                                            Conclusion
                                        </h2>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#fcf6f2] to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                                            {blog.content.conclusion}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags Section */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm pb-6 sm:pb-8 mb-6 sm:mb-8">
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1a365d] pb-3 sm:pb-4">
                                Article Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <Link
                                        key={index}
                                        to={`/blogs?tag=${tag}`}
                                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-[#2c5aa0] hover:text-white transition-all duration-300 border border-gray-200 hover:border-[#2c5aa0] text-xs sm:text-sm"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Social Sharing */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm pb-6 sm:pb-8 mb-6 sm:mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#1a365d] pb-3">
                                        Share This Article
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Help others discover this story
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors">
                                        <FiFacebook className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors">
                                        <FiTwitter className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors">
                                        <FiLinkedin className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors">
                                        <FiInstagram className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                                        <FiMail className="text-lg sm:text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        {blog.images && blog.images.length > 1 && (
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 pb-4 sm:pb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2c5aa0] flex items-center justify-center">
                                        <FiCamera className="text-white text-lg sm:text-xl" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1a365d]">
                                        Visual Journey
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                                    {blog.images.slice(1).map((image, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer"
                                        >
                                            <img
                                                src={image}
                                                alt={`${blog.title} ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32 space-y-4 sm:space-y-6">
                            {/* Author Profile */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                <div className="text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] mx-auto pb-3 sm:pb-4 flex items-center justify-center">
                                        <span className="text-white text-xl sm:text-2xl font-bold">{blog.author.charAt(0)}</span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-serif text-[#1a365d] pb-1 sm:pb-2">{blog.author}</h3>
                                    <p className="text-gray-600 text-sm pb-3 sm:pb-4">{blog.authorTitle}</p>
                                    <p className="text-gray-700 text-xs sm:text-sm">
                                        Sharing authentic travel experiences, cultural insights, and practical tips from journeys across Nepal.
                                    </p>
                                </div>
                            </div>

                            {/* Popular Articles */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 pb-4 sm:pb-6">
                                    <FiTrendingUp className="text-[#2c5aa0]" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#1a365d]">Popular Reads</h3>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {blogData.blogs
                                        .filter(b => b.published)
                                        .sort((a, b) => b.views - a.views)
                                        .slice(0, 3)
                                        .map((popular) => (
                                            <Link
                                                key={popular.id}
                                                to={`/blogs/${popular.slug}`}
                                                onClick={() => window.scrollTo(0, 0)}
                                                className="group flex gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#fcf6f2] transition-all duration-300"
                                            >
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={popular.featuredImage}
                                                        alt={popular.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 group-hover:text-[#2c5aa0] transition-colors line-clamp-2 text-xs sm:text-sm">
                                                        {popular.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs pt-1">
                                                        <FiEye className="w-3 h-3" />
                                                        <span>{popular.views} views</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            {/* Related Articles */}
                            {relatedBlogs.length > 0 && (
                                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-2 pb-4 sm:pb-6">
                                        <FiNavigation className="text-[#2c5aa0]" />
                                        <h3 className="text-lg sm:text-xl font-semibold text-[#1a365d]">Related Stories</h3>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4">
                                        {relatedBlogs.map((related) => (
                                            <Link
                                                key={related.id}
                                                to={`/blogs/${related.slug}`}
                                                onClick={() => window.scrollTo(0, 0)}
                                                className="group flex gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#fcf6f2] transition-all duration-300"
                                            >
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={related.featuredImage}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 group-hover:text-[#2c5aa0] transition-colors line-clamp-2 text-xs sm:text-sm">
                                                        {related.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs pt-1">
                                                        <FiCalendar className="w-3 h-3" />
                                                        <span>{related.date}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-[#2c5aa0] to-[#1a365d] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                                <div className="text-center pb-3 sm:pb-4">
                                    <FiMail className="w-6 h-6 sm:w-8 sm:h-8 mx-auto pb-2 sm:pb-3" />
                                    <h3 className="text-lg sm:text-xl font-serif pb-1 sm:pb-2">Travel Insights</h3>
                                    <p className="text-white/80 text-xs sm:text-sm">
                                        Get weekly stories, tips, and inspiration in your inbox.
                                    </p>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    />
                                    <button className="w-full py-2 sm:py-3 bg-white text-[#1a365d] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-xs sm:text-sm">
                                        Subscribe Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    );
};

export default BlogDetail;