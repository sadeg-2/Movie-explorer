import { useState } from 'react';
import type { CardProps } from '../types/CardTypes';

export default function Card(props: CardProps) {
  const { image, title, subtitle, description, rating, actionLabel, onAction } = props;

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-64 h-80 cursor-pointer perspective-[1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`
          relative w-full h-full
          transition-transform duration-700
          transform-3d
          ${isFlipped ? 'transform-[rotateY(180deg)]' : ''}
        `}
      >
        {/* ✅ FRONT SIDE — YOUR ORIGINAL DESIGN */}
        <div
          className="
    absolute inset-0 
    bg-neutral-900 rounded-xl shadow-lg 
    hover:shadow-red-600/30 hover:scale-105 
    transition-all duration-300
    backface-hidden
    flex flex-col
  "
        >
          {/* ✅ Image ALWAYS TOP */}
          <div className="relative w-full h-40 flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover hover:scale-110 transition duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Rating Badge */}
            <div className="absolute top-2 right-2 z-20 bg-[#111] text-yellow-400 text-xs font-bold px-2 py-1 rounded-md shadow-lg">
              ⭐ {rating}
            </div>

            {/* Play + Heart Buttons */}
            <div className="absolute bottom-2 left-2 flex gap-2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction?.();
                }}
                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition"
              >
                ▶
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition"
              >
                ❤
              </button>
            </div>
          </div>

          {/* ✅ Content + Button fit perfectly */}
          <div className="px-4 pt-2 flex flex-col flex-grow justify-between min-h-0">
            {/* Text Content */}
            <div className="space-y-1 min-h-0 flex-grow">
              <h3 className="text-white text-base font-semibold leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </h3>

              {subtitle && (
                <p className="text-gray-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {subtitle}
                </p>
              )}

              <p
                className="
    text-gray-300 text-xs leading-snug
    overflow-hidden text-ellipsis
    line-clamp-3
    break-words        /* ✅ text MUST wrap */
    whitespace-normal  /* ✅ break long lines */
  "
              >
                {description}
              </p>
            </div>

            {/* ✅ Button ALWAYS bottom */}
            {actionLabel && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction?.();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white mb-3 rounded-lg py-2 text-xs font-medium transition-colors"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>

        {/* ✅ BACK SIDE — SIMPLE TEMP CONTENT */}
        <div
          className="
          absolute inset-0
          bg-neutral-900 text-white p-4 rounded-xl shadow-lg
          transform-[rotateY(180deg)]
          backface-hidden
          wrap-break-word       
            whitespace-normal  
          flex flex-col justify-center items-center gap-4
        "
        >
          <h3 className="text-xl font-bold">{title}</h3>
          <p
            className="
            text-gray-300 text-xs leading-snug
            overflow-hidden text-ellipsis
            line-clamp-3
            wrap-break-word       
            whitespace-normal  
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
