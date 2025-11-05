import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  mapToCardProps,
} from '../services/tmdbService';
import MovieRow from '../components/MovieRow';
import type { CardProps } from '../types/CardTypes';
import Hero from '../components/Hero';
import CastRow from '../components/CastRow';
import type { TMDBMovieDetails } from '../types/TMDBTypes';

type CastItem = { id: number; name: string; character: string; profile_path: string | null };

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<TMDBMovieDetails>();
  const [cast, setCast] = useState<CastItem[]>([]);
  const [similar, setSimilar] = useState<CardProps[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      // Run in parallel for speed
      const [details, credits, similarRaw] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getSimilarMovies(movieId),
      ]);

      if (!mounted) return;
      setDetails(details);
      setCast((credits?.cast ?? []).slice(0, 12));
      setSimilar(mapToCardProps(similarRaw ?? []));
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [movieId]);

  if (loading) {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (!details) {
    return <div className="text-white p-8">Movie not found.</div>;
  }
  function formatRuntime(minutes: number | null): string {
    if (!minutes) return 'Unknown';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero header */}
      <Hero
        id={movieId}
        image={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        title={details.title}
        tagline={`${details.release_date?.slice(0, 4)} • ⭐ ${details.vote_average.toFixed(1)}`}
        description={details.overview}
        onMore={() => {
          document.getElementById('cast-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        
      />

      {/* Cast */}
      <CastRow cast={cast} title="Top Billed Cast" id="cast-section" />
      <section className="max-w-6xl mx-auto px-6 mt-10 text-white">
        <h2 className="text-2xl font-bold mb-4">About the Movie</h2>

        {/* Metadata row */}
        <div className="flex gap-4 text-gray-300 text-sm mb-3 flex-wrap">
          <span>⭐ {details.vote_average?.toFixed(1)}</span>
          <span>{details.release_date?.slice(0, 4)}</span>
          <span>{formatRuntime(details.runtime)}</span>
        </div>

        {/* Genre badges */}
        <div className="flex gap-2 flex-wrap mb-5">
          {details.genres.map((g) => (
            <span key={g.id} className="bg-red-600/30 text-red-400 px-3 py-1 rounded-full text-xs">
              {g.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          {details.overview || 'No description available.'}
        </p>
      </section>

      {/* Similar movies */}
      <div className="mt-10">
        <MovieRow title="Similar Movies" movies={similar} />
      </div>
    </div>
  );
}
