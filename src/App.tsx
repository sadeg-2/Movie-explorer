import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TrailerModal from './components/TrailerModal';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ActorDetails from './components/ActorDetails';
import DiscoverMovies from './pages/DiscoverMovies';
import DiscoverSeries from './pages/DiscoverSeries';
import SeriesDetails from './pages/SeriesDetails';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="bg-cyan-900 min-h-screen pt-20 ">
      <BrowserRouter>
        <TrailerModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<SeriesDetails />} />

          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="/discover/movies" element={<DiscoverMovies />} />
          <Route path="/discover/series" element={<DiscoverSeries />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
