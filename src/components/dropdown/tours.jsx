import { FiChevronRight, FiClock } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import toursData from "../../data/tour.json";

const ToursDropdown = ({ onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState(
    toursData.categories[0]?.id
  );

  const activeCategory = toursData.categories.find(
    (c) => c.id === hoveredCategory
  );

  return (
    <div
      className="
        w-[1490px] h-[650px]
        bg-[#fdf7f3]
        rounded-[32px]
        border border-[#eee2d8]
        shadow-2xl shadow-black/10
        overflow-hidden
      "
    >
      <div className="h-full flex">

        {/* LEFT — CATEGORIES */}
        <div
          className="
            w-[40%]
            relative
            bg-gradient-to-b from-[#fdf7f3] via-[#faf3ee] to-[#f6ede6]
            border-r border-[#eee2d8]
            p-4
            overflow-y-auto
          "
        >
          <div className="space-y-1">
            {toursData.categories.map((category) => {
              const isActive = hoveredCategory === category.id;

              return (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                >
                  <Link
                    to={`/tours/${category.slug}`}
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
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {category.duration}
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

        {/* RIGHT — TOURS */}
        <div className="w-[66%] p-10 flex flex-col overflow-y-auto relative">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
              {activeCategory?.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 ">
              Hand-picked journeys crafted for unforgettable travel experiences
            </p>
          </div>

          {activeCategory?.subcategories?.length ? (
            <div className="grid grid-cols-3 gap-6">
              {activeCategory.subcategories.map((tour) => (
                <Link
                  key={tour.id}
                  to={`/tours/${activeCategory.slug}/${tour.slug}`}
                  onClick={onClose}
                  className="
                    group relative
                    bg-white rounded-2xl p-4
                    border border-[#eee2d8]
                    transition-all duration-300
                    hover:-translate-y-1.5
                    hover:border-amber-400
                    hover:shadow-2xl hover:shadow-black/10
                  "
                >
                  {/* Glow */}
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
                    {tour.name}
                  </h4>

                  <p className="relative mt-2 text-xs text-gray-500 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {tour.duration}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No tours available in this category
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ToursDropdown;