import { FiChevronRight } from "react-icons/fi";
import { useState, useRef, useEffect } from "react"; // Add useRef and useEffect
import { Link } from "react-router-dom";
import trekkingData from "../../data/trekking.json";

const TrekkingDropdown = ({ onClose }) => {
  const [hoveredRegion, setHoveredRegion] = useState(
    trekkingData.regions[0]?.id
  );
  
  // Add ref for right panel
  const rightPanelRef = useRef(null);

  const activeRegion = trekkingData.regions.find((r) => r.id === hoveredRegion);

  // Add useEffect to scroll to top when region changes
  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
  }, [hoveredRegion]);

  return (
    <div className="w-[1000px] h-[320px] bg-[#fdf7f3] rounded-[32px] border border-[#eee2d8] shadow-2xl shadow-black/10 overflow-hidden">
      <div className="h-full flex">

        {/* LEFT — REGIONS */}
        <div className="w-[32%] relative bg-gradient-to-b from-[#fdf7f3] via-[#faf3ee] to-[#f6ede6] border-r border-[#eee2d8] p-4 overflow-y-auto">
          <div className="space-y-5">
            {trekkingData.regions.map((region) => {
              const isActive = hoveredRegion === region.id;
              return (
                <div key={region.id} onMouseEnter={() => setHoveredRegion(region.id)}>
                  <Link
                    to={`/trekking/${region.slug}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onClose?.();
                    }}
                    className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? "bg-white shadow-lg shadow-black/5 scale-[1.01]" : "hover:bg-white/70"}`}
                  >
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[4px] rounded-full transition-all duration-300 ${isActive ? "bg-amber-400" : "bg-transparent group-hover:bg-amber-200"}`} />
                    <div className="flex-1 pl-3">
                      <h4 className="text-[15px] font-medium text-gray-800">{region.name}</h4>
                    </div>
                    <FiChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? "text-amber-500 translate-x-1" : "text-gray-400 group-hover:translate-x-1"}`} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — TREKS */}
        <div 
          ref={rightPanelRef}  // Add ref here
          className="w-[68%] p-10 overflow-y-auto 
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
          <div className="pb-6 border-b border-[#eee2d8] mb-4">
            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">{activeRegion?.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{activeRegion?.subcategories?.length || 0} treks available</p>
          </div>

          {activeRegion?.subcategories?.length ? (
            <div className="space-y-4">
              {activeRegion.subcategories.map((trek) => (
                <Link
                  key={trek.id}
                  to={`/trekking/${activeRegion.slug}/${trek.slug}`}
                  onClick={() => {
                    onClose();
                    window.scrollTo(0, 0);
                  }}
                  className="group relative bg-white rounded-2xl p-4 border border-[#eee2d8] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 block w-full"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

                  {/* Content */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 transition-colors line-clamp-2 pr-4">
                        {trek.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No treks available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrekkingDropdown;