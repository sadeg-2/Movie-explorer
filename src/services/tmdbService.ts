import type { CardProps } from '../types/CardTypes';
import type { TMDBMedia, TMDBSearchResult, TMDBVideo } from '../types/TMDBTypes';

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_KEY = 'e247f482a1353f52e20c467698443143';
const BASE_URL = 'https://api.themoviedb.org/3';

// ✅ Helper that adds ? or &
function buildUrl(endpoint: string, extraParams = '') {
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US${extraParams}`;
}

export async function getActorDetails(id: number) {
  try {
    const url = buildUrl(`/person/${id}`);
    const res = await fetch(url);

    if (!res.ok) throw new Error('Failed to fetch actor details');

    return await res.json();
  } catch (err) {
    console.error('Actor Details Fetch Error →', err);
    return null;
  }
}

export async function getActorMovies(id: number) {
  try {
    const url = buildUrl(`/person/${id}/movie_credits`);
    const res = await fetch(url);

    if (!res.ok) throw new Error('Failed to fetch actor movies');

    const data = await res.json();
    return data.cast ?? [];
  } catch (err) {
    console.error('Actor Movies Fetch Error →', err);
    return [];
  }
}

export function mapToCardProps(items: TMDBMedia[], type?: string): CardProps[] {
  return items.map(
    (m) =>
      ({
        id: m.id,
        image: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : '/placeholder.jpg',
        title: m.title ?? m.name ?? 'Untitled',
        subtitle: m.release_date?.slice(0, 4) ?? m.first_air_date?.slice(0, 4) ?? 'Unknown',
        description: m.overview ?? 'No description available.',
        rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 0,
        actionLabel: 'More Info',
        type: type ?? 'movie',
      } as CardProps)
  );
}
export async function getGenres(type: 'movie' | 'tv') {
  const res = await fetch(buildUrl(`/genre/${type}/list`));
  const data = await res.json();
  return data.genres ?? [];
}

export async function discoverMedia(
  type: 'movie' | 'tv',
  page: number = 1,
  genre?: string,
  year?: string,
  sort: string = 'popularity.desc',
  search?: string
) {
  try {
    let endpoint = search
      ? `/search/${type}?query=${encodeURIComponent(search)}`
      : `/discover/${type}?sort_by=${sort}`;

    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) {
      endpoint +=
        type === 'movie' ? `&primary_release_year=${year}` : `&first_air_date_year=${year}`;
    }

    const url = buildUrl(endpoint, `&page=${page}`);
    console.log('Discover URL:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error('Discover fetch failed');

    const data = await res.json();

    return {
      results: mapToCardProps(data.results ?? []),
      total_pages: Math.min(data.total_pages ?? 1, 500),
    };
  } catch (err) {
    console.error('Discover Media Error →', err);
    return { results: [], total_pages: 1 };
  }
}

export async function fetchMovies(endpoint: string) {
  const res = await fetch(buildUrl(endpoint, '&page=1'));
  if (!res.ok) {
    console.error('TMDB API Error:', res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return data.results ?? [];
}

// ✅ TRAILERS
export async function fetchMovieVideos(id: number) {
  const res = await fetch(buildUrl(`/movie/${id}/videos`));
  const data = await res.json();
  return data;
}

export async function getTrailerKey(
  id: number,
  type: 'movie' | 'tv' = 'movie'
): Promise<string | null> {
  const videoEndpoint = type === 'movie' ? `/movie/${id}/videos` : `/tv/${id}/videos`;

  const res = await fetch(buildUrl(videoEndpoint));
  const data = await res.json();

  const trailer = data.results?.find(
    (v: TMDBVideo) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return trailer?.key ?? null;
}

// ✅ MOVIE DETAILS
export async function getMovieDetails(id: number) {
  const res = await fetch(buildUrl(`/movie/${id}`));
  if (!res.ok) return null;
  return res.json();
}

// ✅ CREDITS (CAST)
export async function getMovieCredits(id: number) {
  const res = await fetch(buildUrl(`/movie/${id}/credits`));
  if (!res.ok) return [];
  return res.json();
}

// ✅ SIMILAR MOVIES
export async function getSimilarMovies(id: number) {
  const res = await fetch(buildUrl(`/movie/${id}/similar`, '&page=1'));
  const data = await res.json();
  return data.results ?? [];
}
// ✅ TV DETAILS
export async function getTVDetails(id: number) {
  try {
    const res = await fetch(buildUrl(`/tv/${id}`));
    if (!res.ok) throw new Error('Failed to fetch TV details');
    return await res.json();
  } catch (err) {
    console.error('TV Details Fetch Error →', err);
    return null;
  }
}

// ✅ TV CREDITS (CAST)
export async function getTVCredits(id: number) {
  try {
    const res = await fetch(buildUrl(`/tv/${id}/credits`));
    if (!res.ok) throw new Error('Failed to fetch TV credits');
    return await res.json();
  } catch (err) {
    console.error('TV Credits Fetch Error →', err);
    return { cast: [] };
  }
}

// ✅ SIMILAR TV SHOWS
export async function getSimilarTV(id: number) {
  try {
    const res = await fetch(buildUrl(`/tv/${id}/similar`, '&page=1'));
    if (!res.ok) throw new Error('Failed to fetch similar TV');
    const data = await res.json();
    return data.results ?? [];
  } catch (err) {
    console.error('Similar TV Fetch Error →', err);
    return [];
  }
}
export async function searchMulti(query: string, page: number = 1) {
  if (!query.trim()) return { results: [] };

  const url = buildUrl(
    `/search/multi?query=${encodeURIComponent(query)}`,
    `&page=${page}`
  );

  const res = await fetch(url);
  if (!res.ok) return { results: [] };

  const data = await res.json();

  // Filter out irrelevant results like "person with no profile"
  return {
    results: data.results?.filter(
      (item: TMDBSearchResult) =>
        item.media_type === 'movie' ||
        item.media_type === 'tv' ||
        (item.media_type === 'person' && item.profile_path)
    ) ?? [],
  };
}


// ✅ EXPORT API in your same style
export const MovieAPI = {
  getVideos: (id: number) => fetchMovieVideos(id),
  getPopular: () => fetchMovies('/movie/popular'),
  getTopRated: () => fetchMovies('/movie/top_rated'),
  getNewReleases: () => fetchMovies('/movie/now_playing'),
  getTrending: () => fetchMovies('/trending/movie/week'),
  getUpcoming: () => fetchMovies('/movie/upcoming'),
  getActionMovies: () => fetchMovies('/discover/movie?with_genres=28'),
  getComedyMovies: () => fetchMovies('/discover/movie?with_genres=35'),
  getHorrorMovies: () => fetchMovies('/discover/movie?with_genres=27'),
  getAnimationMovies: () => fetchMovies('/discover/movie?with_genres=16'),
  getTrendingOne: async () => {
    const data = await fetchMovies('/trending/movie/week');
    return data[0];
  },
  // ✅ New Movie Details
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getTVDetails,
  getTVCredits,
  getSimilarTV,
};
