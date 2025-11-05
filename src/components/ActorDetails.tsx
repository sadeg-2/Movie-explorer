import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorDetails, getActorMovies } from "../services/tmdbService";
import { mapToCardProps } from "../services/tmdbService";
import MovieRow from "../components/MovieRow";
import type { CardProps } from "../types/CardTypes";
import type { TMDBPerson } from "../types/TMDBTypes";

export default function ActorDetails() {
  const { id } = useParams();
  const actorId = Number(id);

  const [details, setDetails] = useState<TMDBPerson>();
  const [movies, setMovies] = useState<CardProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const d = await getActorDetails(actorId);
      const m = await getActorMovies(actorId);

      setDetails(d);
      setMovies(mapToCardProps(m));
      window.scrollTo(0, 0);
    }
    fetchData();
  }, [actorId]);

  if (!details) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="text-white px-6 py-8 max-w-6xl mx-auto">
      <div className="flex gap-6 items-start">
        {/* Actor Photo */}
        <img
          src={
            details.profile_path
              ? `https://image.tmdb.org/t/p/w300${details.profile_path}`
              : "/placeholder-profile.jpg"
          }
          className="w-48 rounded-xl object-cover"
          alt={details.name}
        />

        {/* Actor Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{details.name}</h1>

          {details.birthday && (
            <p className="text-gray-300 mb-2">
              🎂 {details.birthday}  
              {details.place_of_birth && ` • ${details.place_of_birth}`}
            </p>
          )}

          {details.biography && (
            <p className="text-gray-300 leading-relaxed max-w-xl">
              {details.biography}
            </p>
          )}
        </div>
      </div>

      {/* Movies */}
      <MovieRow title="Known For" movies={movies} />
    </div>
  );
}
