import type { CardProps } from "../types/CardTypes";
import type { TMDBMovie, TMDBVideo } from "../types/TMDBTypes";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_KEY = "e247f482a1353f52e20c467698443143";
const BASE_URL = "https://api.themoviedb.org/3";

// ✅ Helper that adds ? or &
function buildUrl(endpoint: string, extraParams = "") {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US${extraParams}`;
}

export function mapToCardProps(movies: TMDBMovie[]): CardProps[] {
  return movies.map((m) => ({
    id: m.id,
    image: m.poster_path
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
      : "/placeholder.jpg",
    title: m.title,
    subtitle: m.release_date?.slice(0, 4) ?? "Unknown",
    description: m.overview,
    rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 0,
    actionLabel: "More Info",
  }));
}

export async function fetchMovies(endpoint: string) {
  const res = await fetch(buildUrl(endpoint, "&page=1"));
  if (!res.ok) {
    console.error("TMDB API Error:", res.status, res.statusText);
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

export async function getTrailerKey(movieId: number): Promise<string | null> {
  const data = await fetchMovieVideos(movieId);
  const trailer = data.results?.find(
    (video: TMDBVideo) => video.type === "Trailer" && video.site === "YouTube"
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
  const res = await fetch(buildUrl(`/movie/${id}/similar`, "&page=1"));
  const data = await res.json();
  return data.results ?? [];
}

// ✅ EXPORT API in your same style
export const MovieAPI = {
  getVideos: (id: number) => fetchMovieVideos(id),
  getPopular: () => fetchMovies("/movie/popular"),
  getTopRated: () => fetchMovies("/movie/top_rated"),
  getNewReleases: () => fetchMovies("/movie/now_playing"),
  getTrending: () => fetchMovies("/trending/movie/week"),
  getUpcoming: () => fetchMovies("/movie/upcoming"),
  getActionMovies: () => fetchMovies("/discover/movie?with_genres=28"),
  getComedyMovies: () => fetchMovies("/discover/movie?with_genres=35"),
  getHorrorMovies: () => fetchMovies("/discover/movie?with_genres=27"),
  getAnimationMovies: () => fetchMovies("/discover/movie?with_genres=16"),
  getTrendingOne: async () => {
    const data = await fetchMovies("/trending/movie/week");
    return data[0];
  },
  // ✅ New Movie Details
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
};
