import { useEffect } from 'react';

type TrailerModalProps = {
  videoKey: string | null;
  onClose: () => void;
};

export default function TrailerModal({ videoKey, onClose }: TrailerModalProps) {
  // ✅ Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!videoKey) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg z-9999 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-4xl rounded-xl overflow-hidden animate-scaleFade"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* YouTube Player */}
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
