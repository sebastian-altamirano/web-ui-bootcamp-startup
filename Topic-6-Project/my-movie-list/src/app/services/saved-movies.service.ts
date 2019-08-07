import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { SavedMovie } from '@models/saved-movie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedMoviesService {
  updated: BehaviorSubject<string> = new BehaviorSubject(null);

  private async loadMovies() {
    const db = await openDB('SavedMovies', 1, {
      upgrade(database, oldVersion, newVersion, transaction) {
        const favoritesStore = database.createObjectStore('favorites');
        const toWatchStore = database.createObjectStore('toWatch');
      },
    });
    return db;
  }

  // Returns a database transaction.
  // <-- store: 'favorites' | 'toWatch'.
  private async getMovieTransaction(store: string) {
    const db = await this.loadMovies();
    const tx = await db.transaction(store, 'readwrite');
    return tx;
  }

  async getAllSavedMovieIDs() {
    const db = await this.loadMovies();
    const savedMovieIDs = {
      favorites: await db.getAllKeys('favorites'),
      toWatch: await db.getAllKeys('toWatch'),
    };
    return savedMovieIDs;
  }

  async addMovie(store: string, movie: SavedMovie) {
    const tx = await this.getMovieTransaction(store);
    await tx.store.put(movie, movie.id);
    this.updated.next(null);
    await tx.done;
  }

  async updateMovie(store: string, movie: SavedMovie) {
    const tx = await this.getMovieTransaction(store);
    await tx.store.put(movie);
    await tx.done;
  }

  async getMovie(store: string, movieID: number) {
    const tx = await this.getMovieTransaction(store);
    const movie = await tx.store.get(movieID);
    await tx.done;
    return movie;
  }

  async deleteMovie(store: string, movieID: number) {
    const tx = await this.getMovieTransaction(store);
    await tx.store.delete(movieID);
    this.updated.next(null);
    await tx.done;
  }

  async getAllMovies(store: string) {
    const tx = await this.getMovieTransaction(store);
    const movies = await tx.store.getAll();
    await tx.done;
    return movies;
  }
}
