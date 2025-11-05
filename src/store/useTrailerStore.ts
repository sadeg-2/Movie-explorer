import { create } from 'zustand';
import { getTrailerKey } from '../services/tmdbService';

export type MediaType = 'movie' | 'tv';

type TrailerStore = {
  trailerKey: string | null;
  isOpen: boolean;
  mediaId: number | null;
  mediaType: MediaType;
  open: (id: number, type?: MediaType) => Promise<void>;
  close: () => void;
};

export const useTrailerStore = create<TrailerStore>((set) => ({
  trailerKey: null,
  isOpen: false,
  mediaId: null,
  mediaType: 'movie', // default fallback ✅

  open: async (id: number, type: MediaType = 'movie') => {
    const key = await getTrailerKey(id, type);
    set({ mediaId: id, mediaType: type, trailerKey: key, isOpen: true });
  },

  close: () =>
    set({
      isOpen: false,
      trailerKey: null,
      mediaId: null,
    }),
}));
