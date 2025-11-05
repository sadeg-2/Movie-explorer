import { useWatchlistStore } from "../store/useWatchlistStore";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function WatchlistPage() {
  const { watchlist } = useWatchlistStore();
  const navigate = useNavigate();

  if (watchlist.length === 0) {
    return (
      <div className="text-white text-center py-20">
        <h2 className="text-2xl font-semibold">Your Watchlist is Empty ⭐</h2>
        <p className="text-gray-400">Start adding movies and shows to watch later!</p>
      </div>
    );
  }

  return (
    <div className="text-white w-full min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-10 px-6">My Watchlist ⭐</h1>

      <div className="w-full flex justify-center overflow-x-hidden">
        <div
          className="grid
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
          gap-x-10 gap-y-14
          max-w-[1500px] w-full px-6 mx-auto"
        >
          {watchlist.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/${item.type}/${item.id}`)}
              className="cursor-pointer transition-transform 
                         hover:scale-105 transform-gpu will-change-transform 
                         max-w-[220px] mx-auto"
            >
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
