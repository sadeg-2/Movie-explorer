import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TrailerModal from './components/TrailerModal';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

export default function App() {
  return (
    <div className="bg-cyan-900 min-h-screen pt-20 ">
      <Navbar />
      <TrailerModal />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
