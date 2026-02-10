
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const ScrollTopButton = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top immediately on page load & route change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // instant scroll
  }, [pathname]);

  // Scroll to top before reload (so refresh always starts at top)
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-500
        bg-[#0b1c3d] text-white hover:bg-[#262626] hover:text-[#6dc6f2]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      aria-label="Back to top"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollTopButton;

