import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import type { CardProps } from '../types/CardTypes';
import { MovieAPI } from '../services/tmdbService';
import type { TMDBMovie } from '../types/TMDBTypes';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [popular, setPopular] = useState<CardProps[]>([]);
  const [topRated, setTopRated] = useState<CardProps[]>([]);
  const [newReleases, setNewReleases] = useState<CardProps[]>([]);
  const [trending, setTrending] = useState<CardProps[]>([]);
  const [upcoming, setUpcoming] = useState<CardProps[]>([]);
  const [actionMovies, setActionMovies] = useState<CardProps[]>([]);
  const [comedyMovies, setComedyMovies] = useState<CardProps[]>([]);
  const [horrorMovies, sethorrorMovies] = useState<CardProps[]>([]);
  const [animationMovies, setAnimationMovies] = useState<CardProps[]>([]);
  const [heroMovie, setHero] = useState<CardProps>();

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
          actionLabel: 'More Info',
          onAction: () => navigate(`/movie/${m.id}`),
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
      setTrending(mapMovies(trendingData));
      setUpcoming(mapMovies(upcomingData));
      setActionMovies(mapMovies(actionData));
      setComedyMovies(mapMovies(comedyData));
      setPopular(mapMovies(popularData));
      setTopRated(mapMovies(topRatedData));
      setNewReleases(mapMovies(newReleasesData));
      setAnimationMovies(mapMovies(animationData));
      sethorrorMovies(mapMovies(horryData));

      const heroMovieRaw = await MovieAPI.getTrendingOne();

      const hero: CardProps = {
        id: heroMovieRaw.id,
        image: `https://image.tmdb.org/t/p/original${heroMovieRaw.backdrop_path}`,
        title: heroMovieRaw.title,
        subtitle: heroMovieRaw.release_date?.slice(0, 4) ?? 'Unknown',
        description: heroMovieRaw.overview,
        rating: heroMovieRaw.vote_average,
        actionLabel: 'Watch Trailer',
        onAction: () => navigate(`/movie/${heroMovieRaw.id}`),
      };
      setHero(hero);
    }

    fetchData();
  }, []);

  return (
    <>
      {heroMovie && (
        <Hero
          id={heroMovie.id}
          image={heroMovie.image}
          title={heroMovie.title}
          tagline={`⭐ ${heroMovie.rating} • ${heroMovie.subtitle}`}
          description={heroMovie.description}
          onMore={() => navigate(`/movie/${heroMovie.id}`)}
        />
      )}

      <MovieRow title="Popular Movies" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="New Releases" movies={newReleases} />
      <MovieRow title="Trending Now" movies={trending} />
      <MovieRow title="Upcoming" movies={upcoming} />
      <MovieRow title="Action Movies" movies={actionMovies} />
      <MovieRow title="Comedy Movies" movies={comedyMovies} />
      <MovieRow title="Animation Movies" movies={animationMovies} />
      <MovieRow title="horror Movies" movies={horrorMovies} />
    </>
  );
}
