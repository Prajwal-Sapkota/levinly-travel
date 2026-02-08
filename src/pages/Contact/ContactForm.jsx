import React, { useState, useRef } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log("Form submitted:", formData);
            setIsSubmitting(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
            alert("Thank you! Your message has been sent successfully.");
        }, 1500);
    };

    return (
        <section className="relative bg-[#fcf6f2] py-12 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Section Header */}
                <div className="text-center pb-10 lg:pb-16">
                    <h2 className="text-2xl lg:text-4xl font-serif font-normal text-[#0b1c3d] pb-4">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base px-4">
                        Have questions or ready to plan your next adventure? Fill out the form below and our travel experts will get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Side - Form */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
                            <form ref={formRef} onSubmit={handleSubmit} className="p-6 lg:p-8">
                                {/* Two Column Inputs - Stack on mobile */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-6">
                                    {/* Name Input */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-700 pb-2">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="w-3 h-3 text-[#6dc5f1]" />
                                                <span>Full Name</span>
                                            </div>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6dc5f1]/30 focus:border-[#6dc5f1] transition-all duration-300"
                                                placeholder="John Doe"
                                            />
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                <FaUser className="w-4 h-4 text-gray-400 group-focus-within:text-[#6dc5f1]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-700 pb-2">
                                            <div className="flex items-center gap-2">
                                                <FaPhone className="w-3 h-3 text-[#6dc5f1]" />
                                                <span>Phone Number</span>
                                            </div>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6dc5f1]/30 focus:border-[#6dc5f1] transition-all duration-300"
                                                placeholder="+977 98XXXXXXXX"
                                            />
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                <FaPhone className="w-4 h-4 text-gray-400 group-focus-within:text-[#6dc5f1]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Input - Full width */}
                                <div className="pb-6 group">
                                    <label className="block text-sm font-medium text-gray-700 pb-2">
                                        <div className="flex items-center gap-2">
                                            <FaEnvelope className="w-3 h-3 text-[#6dc5f1]" />
                                            <span>Email Address</span>
                                        </div>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6dc5f1]/30 focus:border-[#6dc5f1] transition-all duration-300"
                                            placeholder="you@example.com"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <FaEnvelope className="w-4 h-4 text-gray-400 group-focus-within:text-[#6dc5f1]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="pb-8 group">
                                    <label className="block text-sm font-medium text-gray-700 pb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6dc5f1]/30 focus:border-[#6dc5f1] transition-all duration-300 resize-none"
                                        placeholder="Tell us about your travel plans, questions, or requirements..."
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-500">Minimum 50 characters</span>
                                        <span className={`text-xs ${formData.message.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                                            {formData.message.length}/1000
                                        </span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 lg:py-4 px-6 bg-[#0b1c3d] text-white font-semibold rounded-xl hover:bg-[#6dc5f1] transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending Message...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <FaPaperPlane className="w-4 h-4" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side - Map */}
                    <div className="order-1 lg:order-2">
                        <div className="h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                            <div className="relative h-64 sm:h-80 lg:h-full">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.075447430541!2d85.30214915999999!3d27.722904799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzIyLjUiTiA4NcKwMTgnMTcuMSJF!5e0!3m2!1sen!2snp!4v1695123456789!5m2!1sen!2snp`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Levinly Travel Office Location"
                                    className="absolute inset-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;