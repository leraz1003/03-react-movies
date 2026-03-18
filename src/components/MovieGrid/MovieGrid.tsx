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
          {movies.map(
            ({
              id,
              poster_path,
              title,
              backdrop_path,
              overview,
              release_date,
              vote_average,
            }) => (
              <li key={id}>
                <div
                  className={css.card}
                  onClick={() =>
                    onSelect({
                      backdrop_path,
                      overview,
                      title,
                      release_date,
                      vote_average,
                    } as Movie)
                  }
                >
                  <img
                    className={css.image}
                    src={`${IMAGE_BASE_URL + poster_path}`}
                    alt={title}
                    loading="lazy"
                  />
                  <h2 className={css.title}>{title}</h2>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </>
  );
}
