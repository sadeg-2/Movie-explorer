
type HeroProps = {
  id: number;
  image: string; // backdrop/poster url
  title: string;
  tagline?: string;
  description?: string;
  onMore?: () => void;
  onAction: () => void;
};

export default function Hero({
  image,
  title,
  tagline,
  description,
  onMore,
  onAction,
}: HeroProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background image */}
      <img
        loading="lazy"
        src={image}
        onError={(e) => {
          e.currentTarget.src = '/movie.avif';
        }}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay (bottom-left readable) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-end pb-10">
        <div className="max-w-xl">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">{title}</h1>

          {tagline && (
            <p className="text-red-400 mt-2 text-sm md:text-base font-semibold">{tagline}</p>
          )}

          {description && (
            <p className="text-gray-200/90 mt-3 md:mt-4 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              {/* Play icon (inline SVG) */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              Play
            </button>

            <button
              onClick={onMore}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 rounded-lg font-semibold backdrop-blur-md border border-white/20 transition"
            >
              {/* Info icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11 10h2v7h-2zM11 7h2v2h-2z" />
                <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zM12 20a8 8 0 1 1 .001-16.001A8 8 0 0 1 12 20z" />
              </svg>
              More info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
