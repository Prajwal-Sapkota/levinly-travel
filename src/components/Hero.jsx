import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    title: "Wherever you want to go, we'll help you get there",
    subtitle: "ALL GREAT JOURNEYS BEGIN WITH A DREAM",
    description:
      "Welcome to Charm & Awe Travel Co. My name is Amy Grishman and I've had a love for travel since studying abroad in college.",
    button: "Plan Your Trip",
  },
  {
    title: "Discover the world your way",
    subtitle: "TRAVEL DESIGNED AROUND YOU",
    description:
      "Custom itineraries, unforgettable experiences, and stress-free planning.",
    button: "Start Exploring",
  },
  {
    title: "Luxury Experiences Worldwide",
    subtitle: "EXCLUSIVE GETAWAYS",
    description:
      "Access to private villas, unique cultural experiences, and personalized service.",
    button: "View Packages",
  },
];

// Pre-defined image sets to avoid duplicates
const imageSets = [
  ["/images/hero1.webp", "/images/hero2.jpg", "/images/hero3.jpg"],
  ["/images/hero4.jpg", "/images/hero5.jpg", "/images/hero6.jpg"],
  ["/images/hero7.jpg", "/images/hero8.jpg", "/images/hero9.jpg"],
];

// Shuffle the image sets so slides get random sets
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [shuffledImageSets, setShuffledImageSets] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sliderRef = useRef(null);
  const contentRef = useRef(null);
  const imageRefs = useRef([]);

  // Create duplicated slides for continuous effect
  const allSlides = [...slides, ...slides];
  const allImageSets = shuffledImageSets.length > 0
    ? [...shuffledImageSets, ...shuffledImageSets]
    : [];

  // Shuffle image sets once on mount
  useEffect(() => {
    setShuffledImageSets(shuffleArray(imageSets));
  }, []);

  // Scale-in appearing effect ONLY ONCE when component loads
  useEffect(() => {
    if (hasAnimated) return;

    setTimeout(() => {
      // Content scale and slide up effect
      if (contentRef.current) {
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'scale(0.95) translateY(10px)';

        setTimeout(() => {
          contentRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'scale(1) translateY(0)';
        }, 100);
      }

      // Images scale-in effect with stagger
      const firstSlideImages = imageRefs.current[0];
      if (firstSlideImages) {
        firstSlideImages.forEach((img, index) => {
          if (img) {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.9)';

            setTimeout(() => {
              img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              img.style.opacity = '1';
              img.style.transform = 'scale(1)';
            }, 200 + (index * 100)); // Stagger effect
          }
        });
      }

      setHasAnimated(true);
    }, 100);
  }, [hasAnimated]);

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setAnimate(true);

    if (current === slides.length - 1) {
      setCurrent(prev => prev + 1);

      setTimeout(() => {
        setAnimate(false);
        setCurrent(0);
        setIsTransitioning(false);
      }, 700);
    } else {
      setCurrent(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setAnimate(true);

    if (current === 0) {
      setAnimate(false);
      setCurrent(slides.length);

      setTimeout(() => {
        setAnimate(true);
        setCurrent(slides.length - 1);
        setTimeout(() => setIsTransitioning(false), 700);
      }, 50);
    } else {
      setCurrent(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  // Auto slide with continuous effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, isTransitioning]);

  return (
    <section className="relative overflow-hidden bg-[#fdf7f3] pt-18 lg:pt-32 px-4">
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* SLIDER TRACK */}
        <div
          ref={sliderRef}
          className={`flex ${animate ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {allSlides.map((slide, index) => {
            const originalIndex = index % slides.length;
            const slideIndex = Math.min(index, allSlides.length - 1);

            return (
              <div key={index} className="min-w-full flex-shrink-0 w-full">
                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-6 h-[96vh]">
                  {/* CONTENT - Desktop */}
                  <div
                    ref={index === 0 ? contentRef : null}
                    className="bg-white p-8 flex flex-col justify-center
                                shadow-xl border border-black/5
                                translate-x-8 translate-y-8 z-20 h-[380px]"
                    style={hasAnimated ? {} : {
                      opacity: 0,
                      transform: 'scale(0.95) translateY(10px)'
                    }}
                  >
                    <p className="text-xs tracking-widest text-gray-500 mb-3">
                      {slide.subtitle}
                    </p>

                    <h1 className="text-3xl font-serif font-semibold mb-4">
                      {slide.title}
                    </h1>

                    <p className="text-gray-600 mb-6">
                      {slide.description}
                    </p>

                    <button className="w-fit border border-black px-6 py-3 text-sm font-medium
                                       hover:bg-black hover:text-white transition">
                      {slide.button} →
                    </button>
                  </div>

                  {/* IMAGES - Desktop */}
                  {allImageSets[slideIndex]?.map((img, i) => (
                    <div key={i} className="overflow-hidden">
                      <img
                        ref={(el) => {
                          if (!imageRefs.current[index]) {
                            imageRefs.current[index] = [];
                          }
                          if (el && index === 0) {
                            imageRefs.current[index][i] = el;
                          }
                        }}
                        src={img}
                        alt={index === 0 ? "Beautiful mountain view" : ""} // meaningful alt for LCP
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        fetchPriority={index === 0 ? "high" : "auto"} // ⚡ Important for LCP
                        style={
                          index === 0 && !hasAnimated
                            ? { opacity: 0, transform: "scale(0.9)" }
                            : {}
                        }
                      />

                    </div>
                  ))}
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex flex-col gap-6 py-8">
                  {/* IMAGES - Mobile */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 h-48 overflow-hidden rounded-xl shadow-lg">
                      <img
                        ref={el => {
                          if (!imageRefs.current[index]) {
                            imageRefs.current[index] = [];
                          }
                          if (el && index === 0) {
                            imageRefs.current[index][0] = el;
                          }
                        }}
                        src={allImageSets[slideIndex]?.[0] || "/images/hero1.webp"}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        style={index === 0 && !hasAnimated ? {
                          opacity: 0,
                          transform: 'scale(0.9)'
                        } : {}}
                      />
                    </div>

                    <div className="h-48 overflow-hidden rounded-xl shadow-lg">
                      <img
                        ref={el => {
                          if (!imageRefs.current[index]) {
                            imageRefs.current[index] = [];
                          }
                          if (el && index === 0) {
                            imageRefs.current[index][1] = el;
                          }
                        }}
                        src={allImageSets[slideIndex]?.[1] || "/images/hero2.jpg"}
                        alt=""
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        style={index === 0 && !hasAnimated ? {
                          opacity: 0,
                          transform: 'scale(0.9)'
                        } : {}}
                      />
                    </div>

                    <div className="h-48 overflow-hidden rounded-xl shadow-lg">
                      <img
                        ref={el => {
                          if (!imageRefs.current[index]) {
                            imageRefs.current[index] = [];
                          }
                          if (el && index === 0) {
                            imageRefs.current[index][2] = el;
                          }
                        }}
                        src={allImageSets[slideIndex]?.[2] || "/images/hero3.jpg"}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        style={index === 0 && !hasAnimated ? {
                          opacity: 0,
                          transform: 'scale(0.9)'
                        } : {}}
                      />
                    </div>
                  </div>

                  {/* CONTENT - Mobile */}
                  <div
                    ref={index === 0 ? contentRef : null}
                    className="bg-white p-6 flex flex-col justify-center
                                shadow-xl border border-black/5 rounded-lg pt-4"
                    style={hasAnimated ? {} : {
                      opacity: 0,
                      transform: 'scale(0.95) translateY(10px)'
                    }}
                  >
                    <p className="text-xs tracking-widest text-gray-500 mb-3">
                      {slide.subtitle}
                    </p>

                    <h1 className="text-2xl font-serif font-semibold mb-4 leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {slide.description}
                    </p>

                    <button className="w-fit border border-black px-6 py-3 text-sm font-medium
                                       hover:bg-black hover:text-white transition mx-auto lg:mx-0">
                      {slide.button} →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ARROWS - Desktop */}
        <button
          onClick={prevSlide}
          className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2
                     bg-white shadow-xl w-14 h-14 rounded-full
                     items-center justify-center
                     hover:bg-gray-900 hover:text-white transition z-30"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <FaChevronLeft className="text-2xl" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2
                     bg-white shadow-xl w-14 h-14 rounded-full
                     items-center justify-center
                     hover:bg-gray-900 hover:text-white transition z-30"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* ARROWS - Mobile */}
        <button
          onClick={prevSlide}
          className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2
                     bg-white shadow-xl w-10 h-10 rounded-full
                     flex items-center justify-center
                     hover:bg-gray-900 hover:text-white transition z-30"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <button
          onClick={nextSlide}
          className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2
                     bg-white shadow-xl w-10 h-10 rounded-full
                     flex items-center justify-center
                     hover:bg-gray-900 hover:text-white transition z-30"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <FaChevronRight className="text-xl" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 pt-2 lg:pt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setCurrent(index);
                setTimeout(() => setIsTransitioning(false), 700);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${(current % slides.length) === index
                  ? "bg-black w-6"
                  : "bg-gray-300"
                }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;