import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import MoviesService from "Services/movies";

// Although it's defined as a guard it's also a resolver.
export default function MovieDetailGuard({ movieID }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gets the movie data that MovieDetail needs.
    const getMovie = async () => {
      const movie = await MoviesService.getMovie(movieID);
      if (MoviesService.isValidMovieID) await setMovie(movie);
      await setLoading(false);
    };
    getMovie();
    // TODO: A cleanup function is needed when the path is an invalid movie id.
    // Tried using AbortController and makeCancelable without luck.
  }, []);

  // If the movie id is invalid, then redirect to root page.
  if (!loading)
    return movie ? <MovieDetail movie={movie} /> : <Redirect to="/" />;
  return null;
}
