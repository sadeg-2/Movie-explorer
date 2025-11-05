import { useFavoritesStore } from "../store/favoritesStore";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <div className="text-white px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-lg">No favorites yet 👀</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((item) => (
            <Card
              key={`${item.type}-${item.id}`}
              {...item}
              onAction={() => navigate(`/${item.type}/${item.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
