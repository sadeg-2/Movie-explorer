import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTVDetails, getTVCredits, getSimilarTV, mapToCardProps } from '../services/tmdbService';
import Hero from '../components/Hero';
import CastRow from '../components/CastRow';
import MovieRow from '../components/MovieRow';
import type { CardProps } from '../types/CardTypes';
import { useTrailerStore } from '../store/useTrailerStore';

type CastItem = { id: number; name: string; character: string; profile_path: string | null };

export default function SeriesDetails() {
  const { open } = useTrailerStore();
  const { id } = useParams<{ id: string }>();
  const tvId = Number(id);

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>();
  const [cast, setCast] = useState<CastItem[]>([]);
  const [similar, setSimilar] = useState<CardProps[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);

      const [d, c, s] = await Promise.all([
        getTVDetails(tvId),
        getTVCredits(tvId),
        getSimilarTV(tvId),
      ]);

      if (!mounted) return;

      setDetails(d);
      setCast(c?.cast?.slice(0, 12) ?? []);
      setSimilar(mapToCardProps(s ?? [], 'tv'));
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [tvId]);

  if (loading) return <div className="text-white p-8">Loading series...</div>;

  if (!details) return <div className="text-white p-8">Series not found.</div>;

  return (
    <div className="min-h-screen text-white">
      <Hero
        id={tvId}
        image={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        title={details.name}
        tagline={`${
          details.first_air_date?.slice(0, 4) ?? 'Unknown'
        } • ⭐ ${details.vote_average?.toFixed(1)}`}
        description={details.overview}
        onMore={() =>
          document.getElementById('cast-section')?.scrollIntoView({
            behavior: 'smooth',
          })
        }
        onAction={() => open(tvId, 'tv')}
      />

      {/* Cast */}
      <CastRow cast={cast} title="Main Cast" id="cast-section" />

      {/* Series Info */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">About the Show</h2>

        <div className="flex gap-4 text-gray-300 text-sm flex-wrap mb-3">
          <span>⭐ {details.vote_average?.toFixed(1)}</span>
          <span>
            {details.number_of_seasons} Season
            {details.number_of_seasons > 1 ? 's' : ''}
          </span>
          <span>{details.number_of_episodes} Episodes</span>
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          {details.genres?.map((g: any) => (
            <span key={g.id} className="bg-red-600/30 text-red-400 px-3 py-1 rounded-full text-xs">
              {g.name}
            </span>
          ))}
        </div>

        <p className="text-gray-300 leading-relaxed max-w-3xl">
          {details.overview || 'No description available.'}
        </p>
      </section>

      {/* Similar Shows */}
      <div className="mt-10">
        <MovieRow title="Similar Shows" movies={similar} />
      </div>
    </div>
  );
}
