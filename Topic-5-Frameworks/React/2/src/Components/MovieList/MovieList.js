import React from "react";
import "./MovieList.scss";
import MovieItem from "Components/MovieItem/MovieItem";

export default function MovieList({ movies }) {
  return movies && movies.length ? (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="no-movies">
      <p>There are no movies!</p>
    </div>
  );
}
