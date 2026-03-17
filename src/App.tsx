import { useState } from "react";
import "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchMovies from "./services/movieService";
import type { Movie } from "./types/movie";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "./components/MovieGrid/MovieGrid";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (topic: string) => {
    if (!topic) {
      return;
    }
    try {
      const data = await fetchMovies(topic);
      setMovies(data.results);
      console.log("data", data);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />;
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <MovieGrid movies={movies}></MovieGrid>
    </>
  );
}

export default App;
