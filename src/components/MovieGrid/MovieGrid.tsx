import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: void;
  movies: Movie[];
}
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <>
      {movies.length > 0 && (
        <ul className={css.grid}>
          {movies.map(({ id, poster_path, title }) => (
            <li key={id}>
              <div className={css.card}>
                <img
                  className={css.image}
                  src={`${IMAGE_BASE_URL + poster_path}`}
                  alt={title}
                  loading="lazy"
                />
                <h2 className={css.title}>{title}</h2>
              </div>
            </li>
          ))}
          <li></li>
        </ul>
      )}
    </>
  );
}
