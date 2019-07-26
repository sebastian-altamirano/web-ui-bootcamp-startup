import React, { useState, useEffect } from "react";
import "./MovieDetail.scss";
import MoviesService from "../../services/movies";

export default function MovieDetail({
  match: {
    params: { id }
  }
}) {
  id = Number(id);
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    const movie = await MoviesService.getMovie(id);
    await setMovie(movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (movie)
    return (
      <article>
        <h2>{movie.title}</h2>
        <table>
          <tbody>
            <tr>
              <th scope="row">Year of release</th>
              <td>{movie.year || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Duration</th>
              <td>{movie.duration + "hs"}</td>
            </tr>
          </tbody>
        </table>
      </article>
    );
  else return <article />;
}
