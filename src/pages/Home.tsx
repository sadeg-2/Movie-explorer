import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import type { CardProps } from '../types/CardTypes';
import { getTrailerKey, MovieAPI } from '../services/tmdbService';
import type { TMDBMovie } from '../types/TMDBTypes';
import TrailerModal from '../components/TrailerModal';

export default function Home() {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const handlePlayTrailer = async (id: number) => {
    const key = await getTrailerKey(id);
    setTrailerKey(key);
  };

  const [popular, setPopular] = useState<CardProps[]>([]);
  const [topRated, setTopRated] = useState<CardProps[]>([]);
  const [newReleases, setNewReleases] = useState<CardProps[]>([]);
  const [trending, setTrending] = useState<CardProps[]>([]);
  const [upcoming, setUpcoming] = useState<CardProps[]>([]);
  const [actionMovies, setActionMovies] = useState<CardProps[]>([]);
  const [comedyMovies, setComedyMovies] = useState<CardProps[]>([]);
  const [horrorMovies, sethorrorMovies] = useState<CardProps[]>([]);
  const [animationMovies, setAnimationMovies] = useState<CardProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const mapMovies = (movies: TMDBMovie[]): CardProps[] =>
        movies.map((m) => ({
          id: m.id,
          image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          title: m.title,
          subtitle: m.release_date?.slice(0, 4) ?? 'Unknown',
          description: m.overview,
          rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 0,
          actionLabel: 'Watch Now',
        }));

      const popularData = await MovieAPI.getPopular();
      const topRatedData = await MovieAPI.getTopRated();
      const newReleasesData = await MovieAPI.getNewReleases();
      const trendingData = await MovieAPI.getTrending();
      const upcomingData = await MovieAPI.getUpcoming();
      const actionData = await MovieAPI.getActionMovies();
      const comedyData = await MovieAPI.getComedyMovies();
      const animationData = await MovieAPI.getAnimationMovies();
      const horryData = await MovieAPI.getHorrorMovies();
      console.log(horryData);
      setTrending(mapMovies(trendingData));
      setUpcoming(mapMovies(upcomingData));
      setActionMovies(mapMovies(actionData));
      setComedyMovies(mapMovies(comedyData));
      setPopular(mapMovies(popularData));
      setTopRated(mapMovies(topRatedData));
      setNewReleases(mapMovies(newReleasesData));
      setAnimationMovies(mapMovies(animationData));
      sethorrorMovies(mapMovies(horryData));
    }

    fetchData();
  }, []);

  return (
    <>
      {trailerKey && <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />}
      <Hero
        image="https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
        title="Featured Movie Title"
        tagline="Action • Sci-Fi • 2h 10m"
        description="A vigilante fights crime in a futuristic city where chaos rules the night."
        onPlay={() => console.log('Play')}
        onMore={() => console.log('More info')}
      />
      <MovieRow title="Popular Movies" movies={popular} onAction={handlePlayTrailer} />
      <MovieRow title="Top Rated" movies={topRated} onAction={handlePlayTrailer} />
      <MovieRow title="New Releases" movies={newReleases} onAction={handlePlayTrailer} />
      <MovieRow title="Trending Now" movies={trending} onAction={handlePlayTrailer} />
      <MovieRow title="Upcoming" movies={upcoming} onAction={handlePlayTrailer} />
      <MovieRow title="Action Movies" movies={actionMovies} onAction={handlePlayTrailer} />
      <MovieRow title="Comedy Movies" movies={comedyMovies} onAction={handlePlayTrailer} />
      <MovieRow title="Animation Movies" movies={animationMovies} onAction={handlePlayTrailer} />
      <MovieRow title="horror Movies" movies={horrorMovies} onAction={handlePlayTrailer} />
    </>
  );
}
