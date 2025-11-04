import { useTrailerStore } from "../store/useTrailerStore";

export default function TrailerModal() {
  const { trailerKey, isOpen, close } = useTrailerStore();

  if (!isOpen || !trailerKey) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg z-9999 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="relative w-[90%] max-w-4xl rounded-xl overflow-hidden animate-scaleFade"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-red-500 transition"
        >
          ✕
        </button>

        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
