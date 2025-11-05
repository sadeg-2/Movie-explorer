import type { Dispatch, SetStateAction } from "react";

type FilterProps = {
  genres: { id: number; name: string }[];
  genre: string;
  year: string;
  sort: string;
  search: string;
  setGenre: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<string>>;
  setSort: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function DiscoverFilters({
  genres,
  genre,
  year,
  sort,
  search,
  setGenre,
  setYear,
  setSort,
  setSearch,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 px-6">
      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-white/10! text-white! px-4 py-2 rounded-lg w-40"
      />

      {/* Genre */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="bg-blue-900! text-amber-200! px-4 py-2 rounded-lg"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Year */}
      <input
        type="number"
        min="1950"
        max={new Date().getFullYear()}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
        className="bg-blue-900! text-amber-200! px-4 py-2 rounded-lg w-28"
      />

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-blue-900! text-amber-200! px-4 py-2 rounded-lg"
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Top Rated</option>
        <option value="release_date.desc">Latest</option>
      </select>
    </div>
  );
}
