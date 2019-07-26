import { openDB } from "idb";
import Movie from "../classes/movie";

export default class MoviesService {
  static async _loadMovies() {
    // Opens or creates a database and initializes it with the movies.
    const db = await openDB("movies", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        const store = db.createObjectStore("favoriteMovies", {
          autoIncrement: true,
          keyPath: "id"
        });
        // IndexedDB doesn't store classes prototype. Instead of serializing
        // i'll assign the prototype manually if necessary.
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

  // Returns a database transaction.
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
    return movies;
  }
}
