import React, { useState, useEffect, useRef } from "react";
import { FaYoutube } from "react-icons/fa";

const VideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoSectionRef = useRef(null);

  const videos = [
    { id: "0HugkLb7rw4", title: "Mountain Peaks", duration: "2:45" },
    { id: "AGlKNoOtR98", title: "Cultural Journey", duration: "3:20" },
    { id: "qteMnsAU-s8", title: "Ocean Depths", duration: "4:15" },
  ];

  // Scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          setPlaying(true);
          setMuted(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '100px'
      }
    );

    if (videoSectionRef.current) observer.observe(videoSectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === " ") setPlaying((prev) => !prev);
      if (e.key === "m" || e.key === "M") setMuted((prev) => !prev);
      if (e.key === "ArrowRight") {
        setActiveVideo((prev) => (prev + 1) % videos.length);
        setPlaying(true);
      }
      if (e.key === "ArrowLeft") {
        setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length);
        setPlaying(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [videos.length]);

  const getYouTubeEmbedUrl = (videoId) =>
    `https://www.youtube.com/embed/${videoId}?autoplay=${playing ? 1 : 0}&mute=1&modestbranding=1&rel=0&controls=1&playsinline=1`;

  return (
    <div
      ref={videoSectionRef}
      className="relative  bg-[#fcf6f2] flex flex-col items-center justify-center px-4 sm:px-6 py-18 md:py-20 overflow-hidden"
    >
      {/* Floating Background Shapes - Animated */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/3 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500/5 rounded-full blur-2xl md:blur-3xl"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1200ms ease 300ms',
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-purple-500/5 rounded-full blur-2xl md:blur-3xl"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1200ms ease 500ms',
          }}
        ></div>
      </div>

      {/* Main Video - Animated */}
      <div 
        className="relative z-10 w-full max-w-6xl aspect-video rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden bg-black shadow-lg md:shadow-2xl"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
          transition: 'all 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <iframe
          src={getYouTubeEmbedUrl(videos[activeVideo].id)}
          title={videos[activeVideo].title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* YouTube Badge */}
        <div 
          className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 600ms ease 400ms',
          }}
        >
          <FaYoutube className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>YouTube</span>
        </div>
      </div>

      {/* Horizontal Thumbnails - Animated */}
      <div 
        className="relative z-10 mt-6 md:mt-8 flex items-center justify-center sm:justify-center gap-3 sm:gap-4 overflow-x-auto w-full max-w-6xl py-2 px-2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 600ms ease 600ms',
        }}
      >
        {videos.map((video, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveVideo(idx);
              setPlaying(true);
            }}
            className={`relative flex-shrink-0 w-32 sm:w-36 md:w-44 h-16 sm:h-20 md:h-24 rounded-lg sm:rounded-xl cursor-pointer overflow-hidden transition-all duration-500 ${
              activeVideo === idx 
                ? "ring-2 sm:ring-3 md:ring-4 ring-blue-500 scale-105 sm:scale-110 z-20" 
                : "opacity-70 hover:scale-102 sm:hover:scale-105 z-10"
            }`}
            style={{
              transform: isVisible ? 'translateY(0)' : `translateY(${20 + (idx * 10)}px)`,
              opacity: isVisible ? 1 : 0,
              transition: `all 500ms ease ${idx * 100 + 700}ms`,
            }}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots - Animated */}
      <div 
        className="flex gap-2 mt-4 sm:mt-6 z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 600ms ease 1000ms',
        }}
      >
        {videos.map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveVideo(idx);
              setPlaying(true);
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all cursor-pointer ${
              activeVideo === idx 
                ? "bg-gradient-to-r from-[#0B4DBA] to-[#6dc5f1] scale-110 sm:scale-125" 
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;