import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <>
      {movies.length > 0 && (
        <ul className={css.grid}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <div
                className={css.card}
                onClick={() => onSelect(movie as Movie)}
              >
                <img
                  className={css.image}
                  src={`${IMAGE_BASE_URL + movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
                <h2 className={css.title}>{movie.title}</h2>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
