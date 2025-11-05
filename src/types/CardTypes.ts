import type { MediaType } from '../store/useTrailerStore';

export type CardProps = {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  rating: number;
  actionLabel?: string;
  type?: MediaType;
  onAction: () => void;
};
