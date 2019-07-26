import React from "react";
import "./MovieItem.scss";

export default function MovieItem(props) {
  return (
    <div className="movie">
      <p className="movie-title">{props.movie.title}</p>
      <p className="movie-year">{props.movie.year}</p>
      <p className="movie-duration">{props.movie.durationInHours}</p>
    </div>
  );
}
