import { create } from 'zustand';
import { getTrailerKey } from '../services/tmdbService';

type TrailerStore = {
  trailerKey: string | null;
  isOpen: boolean;
  open: (id: number) => Promise<void>;
  close: () => void;
};

export const useTrailerStore = create<TrailerStore>((set) => ({
  trailerKey: null,
  isOpen: false,

  open: async (id: number) => {
    const key = await getTrailerKey(id);
    set({ trailerKey: key, isOpen: true });
  },

  close: () => set({ isOpen: false, trailerKey: null }),
}));
