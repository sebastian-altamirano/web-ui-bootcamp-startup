import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import "./App.scss";
import MovieListResolver from "Components/MovieList/MovieListResolver";
import MovieDetailGuard from "Components/MovieDetail/MovieDetailGuard";
import MovieAdd from "Components/MovieAdd/MovieAdd";
import MovieEditGuard from "Components/MovieEdit/MovieEditGuard";
import FloatingButton from "Components/FloatingButton/FloatingButton";

export default function App() {
  return (
    <Router>
      <header>
        <h1>
          <Link to="/">My favorite movies</Link>
        </h1>
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={MovieListResolver} />
          <Route path="/add" exact component={MovieAdd} />
          <Route
            path="/movie/:id"
            render={({
              match: {
                params: { id: movieID }
              }
            }) => {
              movieID = Number(movieID);
              return <MovieDetailGuard movieID={movieID} />;
            }}
          />
          <Route
            path="/edit/:id"
            render={({
              match: {
                params: { id: movieID }
              }
            }) => {
              movieID = Number(movieID);
              return <MovieEditGuard movieID={movieID} />;
            }}
          />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </main>
      <FloatingButton />
    </Router>
  );
}
