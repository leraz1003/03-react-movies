import { useState } from "react";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (topic: string) => {
    if (!topic) {
      return;
    }
    try {
      setLoader(true);
      setError(false);
      const data = await fetchMovies(topic);
      setMovies(data.results);
      console.log("data", data);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />;
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <MovieGrid
        movies={movies}
        onSelect={(movie) => setSelectedMovie(movie)}
      ></MovieGrid>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
