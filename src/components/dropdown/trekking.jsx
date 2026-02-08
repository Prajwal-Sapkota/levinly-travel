import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import trekkingData from "../../data/trekking.json";

const TrekkingDropdown = ({ onClose }) => {
  const [hoveredRegion, setHoveredRegion] = useState(
    trekkingData.regions[0]?.id
  );

  const activeRegion = trekkingData.regions.find(
    (r) => r.id === hoveredRegion
  );

  return (
    <div
      className="
        w-[1270px] h-[470px]
        bg-[#fdf7f3]
        rounded-[32px]
        border border-[#eee2d8]
        shadow-2xl shadow-black/10
        overflow-hidden
      "
    >
      <div className="h-full flex">

        {/* LEFT — REGIONS */}
        <div
          className="
            w-[32%]
            relative
            bg-gradient-to-b from-[#fdf7f3] via-[#faf3ee] to-[#f6ede6]
            border-r border-[#eee2d8]
            p-6
            
          "
        >
          <div className="space-y-10">
            {trekkingData.regions.map((region) => {
              const isActive = hoveredRegion === region.id;

              return (
                <div
                  key={region.id}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                >
                  <Link
                    to={`/trekking/${region.slug}`}
                    onClick={onClose}
                    className={`
                      group relative flex items-center gap-4
                      px-5 py-4 rounded-2xl
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-white shadow-lg shadow-black/5 scale-[1.01]"
                          : "hover:bg-white/70"
                      }
                    `}
                  >
                    {/* Active Indicator */}
                    <span
                      className={`
                        absolute left-0 top-1/2 -translate-y-1/2
                        h-10 w-[4px] rounded-full
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-amber-400"
                            : "bg-transparent group-hover:bg-amber-200"
                        }
                      `}
                    />

                    <div className="flex-1 pl-3">
                      <h4 className="text-[15px] font-medium text-gray-800">
                        {region.name}
                      </h4>
                      <p className="text-xs text-gray-500 pt-0.5">
                        {region.subcategories?.length} treks available
                      </p>
                    </div>

                    <FiChevronRight
                      className={`
                        w-4 h-4 transition-all duration-300
                        ${
                          isActive
                            ? "text-amber-500 translate-x-1"
                            : "text-gray-400 group-hover:translate-x-1"
                        }
                      `}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — TREKS */}
        <div className="w-[68%] p-10  relative">
          {/* Header */}
          <div className="pb-8">
            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
              {activeRegion?.name}
            </h3>
            <p className="text-sm text-gray-500 pt-1 ">
              Handpicked Himalayan trekking journeys designed for unforgettable experiences
            </p>
          </div>

          {activeRegion?.subcategories?.length ? (
            <div className="grid grid-cols-3 gap-6">
              {activeRegion.subcategories.map((trek) => (
                <Link
                  key={trek.id}
                  to={`/trekking/${activeRegion.slug}/${trek.slug}`}
                  onClick={onClose}
                  className="
                    group relative
                    bg-white rounded-2xl p-6
                    border border-[#eee2d8]
                    transition-all duration-300
                    hover:-translate-y-1.5
                    hover:border-amber-400
                    hover:shadow-2xl hover:shadow-black/10
                  "
                >
                  {/* Glow layer */}
                  <div
                    className="
                      absolute inset-0 rounded-2xl
                      opacity-0 group-hover:opacity-100
                      transition duration-300
                      bg-gradient-to-br from-amber-100/40 via-transparent to-transparent
                      pointer-events-none
                    "
                  />

                  <h4 className="relative text-sm font-medium text-gray-800 leading-snug line-clamp-3">
                    {trek.name}
                  </h4>

                  <p className="relative pt-4 text-xs text-gray-500 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {trek.duration}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-500">
              No treks available in this region
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TrekkingDropdown;