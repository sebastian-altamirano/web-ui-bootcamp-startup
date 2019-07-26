import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import MovieList from "./components/MovieList/MovieList";
import MovieDetail from "./components/MovieDetail/MovieDetail";

export default function App() {
  return (
    <Router>
      <header>
        <h1>
          <Link to="/">My favorite movies</Link>
        </h1>
      </header>
      <Route path="/" exact component={MovieList} />
      <Route path="/movie/:id" component={MovieDetail} />
    </Router>
  );
}
