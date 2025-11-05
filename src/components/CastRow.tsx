import { useNavigate } from 'react-router-dom';
import type { TMDBCast } from '../types/TMDBTypes';

type CastRowProps = {
  cast: TMDBCast[];
  title?: string;
  id: string;
};

export default function CastRow({ id, cast, title = 'Top Billed Cast' }: CastRowProps) {
  const navigate = useNavigate();

  return (
    <section className="mt-8 px-6" id={id}>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {cast.map((actor) => (
          <div
            key={actor.id}
            onClick={() => navigate(`/actor/${actor.id}`)}
            className="shrink-0 w-32 text-center"
          >
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-neutral-800">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : '/person.jpeg'
                }
                alt={actor.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-white text-sm font-semibold mt-2 truncate">{actor.name}</h3>
            <p className="text-gray-400 text-xs truncate">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
