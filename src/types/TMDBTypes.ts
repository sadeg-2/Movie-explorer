export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string; // "YouTube"
  type: string; // "Trailer" / "Teaser" / "Clip"
  official?: boolean;
  published_at?: string;
}
export type TMDBCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};
export interface TMDBMovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  homepage?: string;
  budget?: number;
  revenue?: number;
}

