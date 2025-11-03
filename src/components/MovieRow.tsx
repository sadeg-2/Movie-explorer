import type { CardProps } from '../types/CardTypes';
import Card from './Card';

type MovieRowProps = {
  title: string;
  movies: CardProps[];
};

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="mt-10 px-6 space-y-4">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0">
            <Card {...movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
