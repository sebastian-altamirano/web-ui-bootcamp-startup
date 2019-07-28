import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./MovieEdit.scss";
import MoviesService from "Services/movies";
import Movie from "Models/movie";

function MovieEdit({ history, movie }) {
  const [duration, setDuration] = useState(movie.duration);
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year);

  const goBack = () => {
    history.goBack();
  };

  const updateMovie = event => {
    event.preventDefault();
    MoviesService.updateMovie(
      movie.id,
      new Movie(title, year || "", duration || "")
    );
    goBack();
  };

  const updateMovieDuration = ({ target: { value: duration } }) =>
    setDuration(duration);
  const updateMovieTitle = ({ target: { value: title } }) => setTitle(title);
  const updateMovieYear = ({ target: { value: year } }) => setYear(year);

  return (
    <form onSubmit={updateMovie}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          // Since useState is async, movie.title is used as fallback.
          value={title || movie.title}
          type="text"
          onChange={updateMovieTitle}
          required
          name="title"
          id="title"
        />
      </div>
      <div>
        <label htmlFor="year">Year: </label>
        <input
          value={year || movie.year}
          type="number"
          onChange={updateMovieYear}
          name="year"
          min="1878"
          max={new Date().getFullYear()}
          id="year"
        />
      </div>
      <div>
        <label htmlFor="duration">Duration: </label>
        <input
          value={duration || movie.duration}
          type="time"
          onChange={updateMovieDuration}
          name="duration"
          id="duration"
        />
      </div>
      <button type="submit">Update movie</button>
      <button onClick={goBack}>Cancel</button>
    </form>
  );
}

export default withRouter(MovieEdit);
