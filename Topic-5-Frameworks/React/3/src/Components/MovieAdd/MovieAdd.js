import React, { useState } from "react";
import "./MovieAdd.scss";
import MoviesService from "Services/movies";
import Movie from "Models/movie";

export default function MovieAdd(props) {
  const [duration, setDuration] = useState(null);
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null);

  const addMovie = event => {
    event.preventDefault();
    MoviesService.addMovie(new Movie(title, year || "", duration || ""));
    props.history.push("/");
  };

  const updateMovieDuration = ({ target: { value: duration } }) =>
    setDuration(duration);
  const updateMovieTitle = ({ target: { value: title } }) => setTitle(title);
  const updateMovieYear = ({ target: { value: year } }) => setYear(year);

  return (
    <form onSubmit={addMovie}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          onInput={updateMovieTitle}
          required
          name="title"
          id="title"
        />
      </div>
      <div>
        <label htmlFor="year">Year: </label>
        <input
          type="number"
          onInput={updateMovieYear}
          name="year"
          min="1878"
          max={new Date().getFullYear()}
          id="year"
        />
      </div>
      <div>
        <label htmlFor="duration">Duration: </label>
        <input
          type="time"
          onInput={updateMovieDuration}
          name="duration"
          id="duration"
        />
      </div>
      <button type="submit">Add movie</button>
    </form>
  );
}
