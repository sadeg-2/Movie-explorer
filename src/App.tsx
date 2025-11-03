import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="bg-cyan-900 min-h-screen pt-20 ">
      <Navbar />
      {/* pages or routes here */}
      <Home/>
    </div>
  );
}
