import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SavedMoviesService } from '@services/saved-movies.service';
import { TMDBMovie } from '@models/tmdbmovie';
import { SavedMovie } from '@models/saved-movie';
import { from, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss'],
})
export class MoviePosterComponent implements OnInit, OnDestroy {
  @Input() movie: TMDBMovie;
  @Input() size: string;

  savedMovieIDs$: Observable<{
    favorites: IDBValidKey[];
    toWatch: IDBValidKey[];
  }>;
  isFavorite: boolean;
  isToWatch: boolean;
  subscriptions: Subscription[] = [];

  constructor(private savedMoviesService: SavedMoviesService) {
    this.savedMovieIDs$ = from(this.savedMoviesService.getAllSavedMovieIDs());
  }

  addToFavorites(event) {
    event.stopPropagation();
    if (!this.isFavorite) {
      // I don't add it as a component property as it would be a waste of
      // memory.
      const movie = new SavedMovie(
        this.movie.id,
        this.movie.vote_average,
        this.movie.title,
        this.movie.popularity,
        this.movie.poster_path,
        this.movie.genre_ids,
        this.movie.overview,
        this.movie.release_date
      );
      this.savedMoviesService.addMovie('favorites', movie);
      this.isFavorite = true;
    } else {
      this.savedMoviesService.deleteMovie('favorites', this.movie.id);
      this.isFavorite = false;
    }
  }

  addToWatch(event) {
    event.stopPropagation();
    if (!this.isToWatch) {
      const movie = new SavedMovie(
        this.movie.id,
        this.movie.vote_average,
        this.movie.title,
        this.movie.popularity,
        this.movie.poster_path,
        this.movie.genre_ids,
        this.movie.overview,
        this.movie.release_date
      );
      this.savedMoviesService.addMovie('toWatch', movie);
      this.isToWatch = true;
    } else {
      this.savedMoviesService.deleteMovie('toWatch', this.movie.id);
      this.isToWatch = false;
    }
  }

  getFavoriteIcons() {
    return {
      material_icons: true,
      star: this.isFavorite,
      star_border: !this.isFavorite,
    };
  }

  getWatchLaterIcons() {
    return {
      material_icons: true,
      watch_later: this.isToWatch,
      access_time: !this.isToWatch,
    };
  }

  ngOnInit() {
    const savedMovieIDsObserver = this.savedMovieIDs$.subscribe(savedIDs => {
      this.isFavorite = savedIDs.favorites.includes(this.movie.id);
      this.isToWatch = savedIDs.toWatch.includes(this.movie.id);
    });
    this.subscriptions.push(savedMovieIDsObserver);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(observer => observer.unsubscribe());
  }
}
