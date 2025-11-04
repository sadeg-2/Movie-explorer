import type { TMDBVideo } from "../types/TMDBTypes";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_KEY = 'e247f482a1353f52e20c467698443143';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(endpoint: string) {
  const separator = endpoint.includes('?') ? '&' : '?';

  const res = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!res.ok) {
    console.error('TMDB API Error:', res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return data.results ?? [];
}

export async function fetchMovieVideos(id: number) {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
  return res.json();
}
export async function getTrailerKey(movieId: number): Promise<string | null> {
  const data = await fetchMovieVideos(movieId);

  const trailer = data.results?.find(
    (video: TMDBVideo) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailer?.key ?? null;
}

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
};
