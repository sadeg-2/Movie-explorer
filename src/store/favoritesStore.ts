import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CardProps } from '../types/CardTypes';

type FavoritesState = {
  favorites: CardProps[];
  toggleFavorite: (item: CardProps) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (item) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f.id === item.id);

        if (exists) {
          set({
            favorites: favorites.filter((f) => f.id !== item.id),
          });
        } else {
          set({
            favorites: [...favorites, item],
          });
        }
      },

      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    {
      name: 'favorites-storage', // ✅ LocalStorage key
    }
  )
);
