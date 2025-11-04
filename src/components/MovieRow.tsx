import type { CardProps } from '../types/CardTypes';
import Card from './Card';

type MovieRowProps = {
  title: string;
  movies: CardProps[];
};

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
  <section className="mt-10 px-6">
  {/* ✅ Title not part of scroll */}
  <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

  {/* ✅ Scroll wrapper with fixed height */}
  <div className="relative h-[22rem] overflow-y-hidden">
    <div
      className="
        overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory
        h-full
      "
    >
      {/* ✅ Inline-flex keeps perfect horizontal layout */}
      <div
        className="
          inline-flex gap-4
          items-center
          h-full
          whitespace-nowrap
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              shrink-0 snap-start
              first:ml-0 last:mr-0
            "
          >
            <Card {...movie} />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
}
