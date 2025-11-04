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
