import { FiChevronRight } from "react-icons/fi";
import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import toursData from "../../data/tour.json";

const ToursDropdown = ({ onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState(
    toursData.categories[0]?.id
  );
  const contentRef = useRef(null);
  // Add ref for right panel
  const rightPanelRef = useRef(null);

  const activeCategory = useMemo(
    () => toursData.categories.find((c) => c.id === hoveredCategory),
    [hoveredCategory]
  );

  // Dynamic height calculation
  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxHeight = windowHeight * 0.8;
      const calculatedHeight = Math.min(contentHeight, maxHeight);
      // Update container height
      contentRef.current.parentElement.style.height = `${Math.max(calculatedHeight, 590)}px`;
    }
  }, [hoveredCategory]);

  // Add useEffect to scroll right panel to top when category changes
  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
  }, [hoveredCategory]);

  return (
    <div className="w-[1400px] bg-[#fdf7f3] rounded-[32px] border border-[#eee2d8] shadow-2xl shadow-black/10 overflow-hidden">
      <div ref={contentRef} className="h-full flex">

        {/* LEFT — CATEGORIES */}
        <div className="w-[40%] bg-gradient-to-b from-[#fdf7f3] via-[#faf3ee] to-[#f6ede6] border-r border-[#eee2d8] p-5 overflow-y-auto">
          <div className="space-y-4">
            {toursData.categories.map((category) => {
              const isActive = hoveredCategory === category.id;
              return (
                <div key={category.id} onMouseEnter={() => setHoveredCategory(category.id)}>
                  <Link
                    to={`/tours/${category.slug}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onClose?.();
                    }}
                    className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? "bg-white shadow-lg shadow-black/5" : "hover:bg-white/70"}`}
                  >
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[4px] rounded-full transition-all duration-300 ${isActive ? "bg-amber-400" : "bg-transparent group-hover:bg-amber-200"}`} />
                    <div className="flex-1 pl-3">
                      <h4 className="text-[15px] font-medium text-gray-800 ">{category.name}</h4>
                    </div>
                    <FiChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? "text-amber-500 translate-x-1" : "text-gray-400 group-hover:translate-x-1"}`} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — TOURS */}
        <div 
          ref={rightPanelRef}
          className="w-[60%] p-5 overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-gray-100/50
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-400
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-transparent
            [&::-webkit-scrollbar-thumb]:bg-clip-padding
            [&::-webkit-scrollbar-thumb:hover]:bg-amber-500"
        >
          <div className="pb-8">
            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">{activeCategory?.name}</h3>
          </div>

          {activeCategory?.subcategories?.length ? (
            <div className="space-y-4">
              {activeCategory.subcategories.map((tour) => (
                <Link
                  key={tour.id}
                  to={`/tours/${activeCategory.slug}/${tour.slug}`}
                  onClick={() => {
                    onClose();
                    window.scrollTo(0, 0);
                  }}
                  className="group relative bg-white rounded-2xl p-4 border border-[#eee2d8] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 block w-full"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                  <div className="relative flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-800 transition-colors">
                      {tour.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No tours available
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ToursDropdown;