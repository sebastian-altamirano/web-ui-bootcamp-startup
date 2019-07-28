import React from "react";
import "./App.scss";
import MovieList from "./components/MovieList/MovieList";

export default function App() {
  return (
    <div>
      <header>
        <h1>My favorite movies</h1>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  );
}
