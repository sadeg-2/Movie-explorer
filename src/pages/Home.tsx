import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { moviesDummy } from '../data/dummyMovies';

export default function Home() {
  return (
    <>
      <Hero
        image="https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
        title="Featured Movie Title"
        tagline="Action • Sci-Fi • 2h 10m"
        description="A vigilante fights crime in a futuristic city where chaos rules the night."
        onPlay={() => console.log('Play')}
        onMore={() => console.log('More info')}
      />
      <MovieRow title="Popular Movies" movies={moviesDummy} />
    </>
  );
}
