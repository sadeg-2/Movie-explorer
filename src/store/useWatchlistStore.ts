import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CardProps } from "../types/CardTypes";

type WatchlistStore = {
  watchlist: CardProps[];
  add: (item: CardProps) => void;
  remove: (id: number) => void;
  toggle: (item: CardProps) => void;
  isAdded: (id: number) => boolean;
};

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: [],

      add: (item) =>
        set((state) => ({
          watchlist: [...state.watchlist, item],
        })),

      remove: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((i) => i.id !== id),
        })),

      toggle: (item) => {
        const exists = get().isAdded(item.id);
        if (exists) {
          get().remove(item.id);
        } else {
          get().add(item);
        }
      },

      isAdded: (id) =>
        get().watchlist.some((item) => item.id === id),
    }),
    {
      name: "watchlist-storage",
    }
  )
);
