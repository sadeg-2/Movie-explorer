import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TrailerModal from './components/TrailerModal';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ActorDetails from './components/ActorDetails';

export default function App() {
  return (
    <div className="bg-cyan-900 min-h-screen pt-20 ">
      <BrowserRouter>
        <TrailerModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/actor/:id" element={<ActorDetails />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
