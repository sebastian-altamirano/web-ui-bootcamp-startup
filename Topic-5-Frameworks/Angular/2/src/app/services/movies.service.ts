import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";
import { openDB } from "idb";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  // This is for the purpose of InvalidMovieIDGuard, so that it can detect when
  // a route is valid, and if not, redirect the page to root.
  // A route is invalid when the movie id is not in the database.
  isValidMovieID: boolean = false;

  private async loadMovies() {
    // Opens or creates a database and initializes it with the movies.
    const db = await openDB("movies", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        const store = db.createObjectStore("favoriteMovies", {
          autoIncrement: true,
          keyPath: "id"
        });
        // Data is saved as Movie[], but the prototype is lost once in the
        // database. Instead of serializing i'll assign the prototype manually
        // if necessary.
        const movies: Movie[] = [
          new Movie("Fake Movie 1", 2005, "02:29"),
          new Movie("Fake Movie 2", 1998, "01:54"),
          new Movie("Fake Movie 3", 2007, "01:39"),
          new Movie("Fake Movie 4", 2008, "02:04")
        ];
        movies.forEach(movie => store.put(movie));
      }
    });
    return db;
  }

  // Returns a database transaction.
  private async getMovieTransaction() {
    const db = await this.loadMovies();
    const tx = await db.transaction("favoriteMovies", "readwrite");
    return tx;
  }

  async addMovie(movie) {
    const tx = await this.getMovieTransaction();
    tx.store.put(movie);
    await tx.done;
  }

  async getMovie(id) {
    const tx = await this.getMovieTransaction();
    const movie = await tx.store.get(id);
    this.isValidMovieID = movie === undefined ? false : true;
    await tx.done;
    return movie;
  }

  async deleteMovie(id) {
    const tx = await this.getMovieTransaction();
    const movie = await tx.store.delete(id);
    await tx.done;
  }

  async getAllMovies() {
    const tx = await this.getMovieTransaction();
    const movies = await tx.store.getAll();
    this.isValidMovieID = movies === undefined ? false : true;
    await tx.done;
    return movies;
  }
}
