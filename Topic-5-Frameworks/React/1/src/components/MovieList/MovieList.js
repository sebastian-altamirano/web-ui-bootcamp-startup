import React from "react";
import "./MovieList.scss";
import MovieItem from "../MovieItem/MovieItem";
import Movie from "../../classes/movie";

export default function MovieList() {
  const movies = [
    new Movie("Fake Movie 1", 2005, 227),
    new Movie("Fake Movie 2", 1998, 152),
    new Movie("Fake Movie 3", 2007, 189),
    new Movie("Fake Movie 4", 2008, 211)
  ];
  if (movies && movies.length)
    return (
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <MovieItem movie={movie} />
          </li>
        ))}
      </ul>
    );
  else
    return (
      <div className="no-movies">
        <p>There are no movies!</p>
      </div>
    );
}
