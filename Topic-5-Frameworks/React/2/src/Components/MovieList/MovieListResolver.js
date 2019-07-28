import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MoviesService from "Services/movies";

export default function MovieListResolver() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const movies = await MoviesService.getAllMovies();
    if (MoviesService.isValidMovieID) await setMovies(movies);
    await setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (!loading && movies) return <MovieList movies={movies} />;
  return null;
}
