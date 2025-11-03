import { useState } from 'react';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

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
        <a className="cursor-pointer hover:text-red-500 transition">Home</a>
        <a className="cursor-pointer hover:text-red-500 transition">Movies</a>
        <a className="cursor-pointer hover:text-red-500 transition">Series</a>
        <a className="cursor-pointer hover:text-red-500 transition">Favorites</a>
      </div>

      {/* SEARCH + PROFILE */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="hidden sm:block bg-neutral-800 text-sm px-3 py-1 rounded-lg outline-none border border-neutral-700 focus:border-red-500 transition"
        />

        {/* Profile Icon */}
        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="
      w-9 h-9 rounded-full bg-neutral-700 flex
      items-center justify-center
      hover:bg-red-600 transition
    "
          >
            <span className="text-sm font-bold">U</span>
          </button>

          {/* Dropdown */}
          {openMenu && (
            <div
              className="
                absolute right-0 mt-2 w-40
                bg-neutral-700 rounded-md shadow-xl
                py-2 z-50
                animate-fadeIn
                "
            >
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 transition">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 transition">
                Watchlist
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 text-red-500 transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
