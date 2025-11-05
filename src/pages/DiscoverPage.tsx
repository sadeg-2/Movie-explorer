import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { discoverMedia } from '../services/tmdbService';
import type { CardProps } from '../types/CardTypes';
import Card from '../components/Card';
import { getGenres } from '../services/tmdbService';
import DiscoverFilters from '../components/FiltersBar';
type DiscoverProps = {
  type: 'movie' | 'tv';
  title: string;
  discoverEndpoint: string;
};

export default function DiscoverPage({ type, title }: DiscoverProps) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [results, setResults] = useState<CardProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [search, setSearch] = useState('');
  useEffect(() => {
    (async () => {
      const g = await getGenres(type);
      setGenres(g);
    })();
  }, [type]);

  useEffect(() => {
    setPage(1);
  }, [genre, year, sort, search]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { results, total_pages } = await discoverMedia(type, page, genre, year, sort, search);

      setResults(results);
      setTotalPages(total_pages);
      setLoading(false);
      window.scrollTo(0, 0);
    }
    load();
  }, [type, page, genre, year, sort, search]);

  return (
    <div className="text-white w-full min-h-screen py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-10 px-6">{title}</h1>
      <DiscoverFilters
        genres={genres}
        genre={genre}
        year={year}
        sort={sort}
        search={search}
        setGenre={setGenre}
        setYear={setYear}
        setSort={setSort}
        setSearch={setSearch}
      />

      {/* ✅ Movie Grid */}
      {loading ? (
        <div className="text-gray-400 text-center w-full">Loading...</div>
      ) : (
        <div className="w-full flex justify-center overflow-x-hidden">
          <div
            className="
            grid
           grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
            gap-x-10 gap-y-14
            max-w-[1500px] w-full
            px-6
            mx-auto
          "
          >
            {results.map((movie) => (
              <div
                key={movie.id}
                className="
                cursor-pointer
                transition-transform
                hover:scale-105 transform-gpu will-change-transform
                max-w-[220px]
                 mx-auto  /* ✅ Center within the grid cell */
              "
              >
                <Card {...movie} onAction={() => navigate(`/${type}/${movie.id}`)} type={type} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center items-center gap-6 mt-16">
        {/* Prev Button */}
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg disabled:opacity-40 transition"
        >
          Prev
        </button>

        {/* Dynamic smart pagination */}
        <div className="flex items-center gap-3">
          {(() => {
            let pages: number[] = [];

            if (totalPages <= 5) {
              // ✅ Small result set → show all pages
              pages = [...Array(totalPages)].map((_, i) => i + 1);
            } else if (page <= 3) {
              // ✅ Near the beginning
              pages = [1, 2, 3, 4, 5];
            } else if (page >= totalPages - 2) {
              // ✅ Near the end
              pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
              // ✅ Middle range → center page
              pages = [page - 2, page - 1, page, page + 1, page + 2];
            }

            return pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`
          px-3 py-1 rounded transition
          ${p === page ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}
        `}
              >
                {p}
              </button>
            ));
          })()}
        </div>

        {/* Next Button */}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
