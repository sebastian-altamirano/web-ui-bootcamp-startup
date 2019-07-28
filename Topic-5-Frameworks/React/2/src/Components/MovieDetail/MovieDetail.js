import React from "react";
import "./MovieDetail.scss";

export default function MovieDetail({ movie }) {
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
            <td>{movie.durationInHours}</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
