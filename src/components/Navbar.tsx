import { Link } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        bg-cyan-950/90 backdrop-blur-md
        text-white py-4 px-6
        flex items-center justify-between shadow-lg
      "
    >
      {/* LOGO */}
      <div className="text-red-600 font-extrabold text-xl tracking-wide">🎬 MovieApp</div>

      {/* LINKS */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/" className="cursor-pointer hover:text-red-500 transition">
          Home
        </Link>
        <Link to="/discover/movies" className="cursor-pointer hover:text-red-500 transition">
          Movies
        </Link>
        <Link to="/discover/series" className="cursor-pointer hover:text-red-500 transition">
          Series
        </Link>
        <Link to="/favorites" className="hover:text-red-500 transition">
          Favorites ❤️
        </Link>
      </div>

      {/* SEARCH + PROFILE */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <NavbarSearch />

        {/* Profile Icon + Hover Dropdown */}
        <div className="relative group">
          {/* Profile Button */}
          <button
            className="
              w-9 h-9 rounded-full bg-neutral-700 flex
              items-center justify-center
              hover:bg-red-600 transition
            "
          >
            <span className="text-sm font-bold">U</span>
          </button>

          {/* Dropdown */}
          <div
            className="
              absolute right-0 mt-3 w-48 bg-neutral-900 rounded-lg shadow-xl py-2
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-50
            "
          >
            {/* Profile */}
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-neutral-800 transition-colors">
              <span className="text-lg">👤</span>
              Profile
            </button>

            {/* Watchlist */}
            <Link
              to="/watchlist"
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-neutral-800 transition-colors"
            >
              <span className="text-lg">⭐</span>
              Watchlist
            </Link>

            {/* Divider */}
            <div className="my-1 border-t border-neutral-700" />

            {/* Logout */}
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-neutral-800 hover:text-red-300 transition-colors">
              <span className="text-lg">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
