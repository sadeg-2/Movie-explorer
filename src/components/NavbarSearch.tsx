import { useState, useEffect, useRef } from 'react';
import { searchMulti } from '../services/tmdbService';
import { useNavigate } from 'react-router-dom';

export default function NavbarSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      const data = await searchMulti(query);
      setResults(data.results.slice(0, 6));
      setOpen(true);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleSelect = (item: any) => {
    setQuery('');
    setOpen(false);

    if (item.media_type === 'movie') navigate(`/movie/${item.id}`);
    if (item.media_type === 'tv') navigate(`/tv/${item.id}`);
    if (item.media_type === 'person') navigate(`/actor/${item.id}`);
  };

  return (
    <div className="relative w-64">
      {/* Input */}
      <input
        type="text"
        className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
        placeholder="Search movies, shows or actors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown Results */}
      {open && results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-black/90 border border-white/10 rounded-lg shadow-xl backdrop-blur-lg z-50">
          <ul className="max-h-80 overflow-y-auto">
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="p-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 text-sm"
              >
                <img
                  className="w-10 h-14 object-cover rounded"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : item.profile_path
                      ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                      : '/placeholder.jpg'
                  }
                  alt=""
                />
                <div>
                  <p className="font-semibold">{item.title || item.name}</p>
                  <span className="text-gray-400 text-xs uppercase">{item.media_type}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
