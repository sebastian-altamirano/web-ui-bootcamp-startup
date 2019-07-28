import React from "react";
import { Link } from "react-router-dom";
import "./MovieItem.scss";

export default function MovieItem(props) {
  return (
    <Link to={`/movie/${props.movie.id}`}>
      <div className="movie">
        <p className="movie-title">{props.movie.title}</p>
        <p className="movie-year">{props.movie.year || "-"}</p>
        <p className="movie-duration">{props.movie.durationInHours}</p>
      </div>
    </Link>
  );
}
