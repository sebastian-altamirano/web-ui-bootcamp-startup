import React, { useState, useEffect } from "react";
import "./MovieList.scss";
import MovieItem from "../MovieItem/MovieItem";
import MoviesService from "../../services/movies";

export default function MovieList() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const movies = await MoviesService.getAllMovies();
    await setMovies(movies);
    await setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (!loading) {
    if (movies && movies.length)
      return (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <MovieItem movie={movie} />
            </li>
          ))}
        </ul>
      );
    return (
      <div className="no-movies">
        <p>There are no movies!</p>
      </div>
    );
  } else return <article />;
}
