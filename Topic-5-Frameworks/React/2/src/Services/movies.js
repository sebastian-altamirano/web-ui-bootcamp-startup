import { openDB } from "idb";
import Movie from "Models/movie";

export default class MoviesService {
  isValidMovieID = false;

  static async _loadMovies() {
    // Opens or creates the "movies" database and initializes it with a bunch
    // of movies.
    const db = await openDB("movies", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        const store = db.createObjectStore("favoriteMovies", {
          autoIncrement: true,
          keyPath: "id"
        });
        // Since IndexedDB doesn't store classes prototype, "Movie" prototype
        // will be asigned on get operations before returning the data.
        const movies = [
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

  // Returns a database transaction for the "favoriteMovies" store of the
  // "movies" database.
  static async _getMovieTransaction() {
    const db = await MoviesService._loadMovies();
    const tx = await db.transaction("favoriteMovies", "readwrite");
    return tx;
  }

  static async addMovie(movie) {
    const tx = await MoviesService._getMovieTransaction();
    tx.store.put(movie);
    await tx.done;
  }

  static async getMovie(id) {
    const tx = await MoviesService._getMovieTransaction();
    const movie = await tx.store.get(id);
    await tx.done;
    if (movie === undefined) {
      this.isValidMovieID = false;
      return null;
    } else this.isValidMovieID = true;
    Object.setPrototypeOf(movie, Movie.prototype);
    return movie;
  }

  static async deleteMovie(id) {
    const tx = await MoviesService._getMovieTransaction();
    await tx.store.delete(id);
    await tx.done;
  }

  static async getAllMovies() {
    const tx = await MoviesService._getMovieTransaction();
    const movies = await tx.store.getAll();
    await tx.done;
    if (movies === undefined) {
      this.isValidMovieID = false;
      return null;
    } else this.isValidMovieID = true;
    movies.forEach(movie => Object.setPrototypeOf(movie, Movie.prototype));
    return movies;
  }
}
