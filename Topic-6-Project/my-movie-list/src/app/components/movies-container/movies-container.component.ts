import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { TMDBService } from '@services/tmdb.service';
import { ConfigurationService } from '@services/configuration.service';
import { Configuration } from '@models/configuration';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieGridComponent } from '@components/movie-grid/movie-grid.component';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { TMDBMovie } from '@models/tmdbmovie';
import { Router } from '@angular/router';
import { SavedMoviesService } from '@services/saved-movies.service';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss'],
})
export class MoviesContainerComponent
  implements OnInit, AfterViewInit, OnDestroy {
  configuration: Configuration;
  isSearch = false;
  movies: TMDBMovie[] = [];
  movies$: Observable<TMDBMovie[]>;

  @ViewChildren(MovieGridComponent) gridView: QueryList<MovieGridComponent>;
  @ViewChildren(MovieListComponent) listView: QueryList<MovieListComponent>;
  movieGrid = null;
  movieList = null;
  movieBottom = {
    movieGridBottom: null,
    movieListBottom: null,
  };
  shouldUpdate = true;
  subscriptions: Subscription[] = [];

  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
    private savedMoviesService: SavedMoviesService,
    private tmdbService: TMDBService
  ) {}

  updateSavedMovies(store: string, search: string) {
    const savedMovies$ = from(this.savedMoviesService.getAllMovies(store));
    const unformattedSearch = search.replace(/\s+/g, '');
    if (unformattedSearch.length !== 0) {
      this.movies$ = savedMovies$.pipe(
        map(savedMovies => {
          search = search.toLowerCase();
          const searchedMovies = savedMovies.filter(movie => {
            const title = movie.title.toLowerCase();
            return title.includes(search);
          });
          return searchedMovies;
        })
      );
    }
  }

  ngOnInit() {
    const configurationObserver = this.configurationService.configuration$.subscribe(
      newConfiguration => (this.configuration = newConfiguration)
    );
    this.subscriptions.push(configurationObserver);
    const savedMoviesObserver = this.savedMoviesService.updated.subscribe(
      search => {
        if (
          this.router.url === '/favorites' ||
          this.router.url === '/to-watch'
        ) {
          const store = {
            '/favorites': 'favorites',
            '/to-watch': 'toWatch',
          };
          if (search) {
            this.updateSavedMovies(store[this.router.url], search);
          } else {
            this.movies$ = from(
              this.savedMoviesService.getAllMovies(store[this.router.url])
            );
          }
        }
      }
    );
    this.subscriptions.push(savedMoviesObserver);
    if (this.router.url === '/') {
      // If coming from another route, recover the movies that were loaded.
      if (!this.movies$ && this.tmdbService.searchedMovies$) {
        this.tmdbService.movies$.next(this.tmdbService.searchedMovies$);
      }
      const tmdbObserver = this.tmdbService.movies$.subscribe(movies$ => {
        // Before updating the movies, backup the scroll position.
        if (this.movieGrid) {
          this.movieBottom.movieGridBottom = this.movieGrid.scrollTop;
        }
        if (this.movieList) {
          this.movieBottom.movieListBottom = this.movieList.scrollTop;
        }
        let oldMovies = null;
        // I want to view more movies from popular (home) or from a search
        // (of the same query than the last)...
        if (this.isSearch === movies$.isSearch) {
          // I want to view more movies from a search...
          if (this.isSearch && movies$.isSearch) {
            // ...and it's a different query, so i delete the old movies that
            // i had saved.
            if (this.tmdbService.search !== movies$.search) {
              oldMovies = [];
              this.shouldUpdate = true;
            }
            // ...and it's from the same query, so i concatenate the results
            // with the old movies that i had stored.
            else {
              oldMovies = this.movies;
            }
          }
          // I want to view more movies from popular (home).
          else {
            oldMovies = this.movies;
          }
        }
        // I want to view movies from popular coming from search, or from
        // search coming from popular, so i delete the old movies that i had
        // stored.
        else {
          oldMovies = [];
          this.shouldUpdate = true;
        }
        this.tmdbService.search = movies$.search;
        this.isSearch = movies$.isSearch;
        // If all the movies from a source are exhausted, then don't update
        // the old movies.
        if (this.shouldUpdate) {
          this.movies$ = movies$.movies$.pipe(
            map(newMovies => {
              this.shouldUpdate =
                this.tmdbService.page <= newMovies.total_pages;
              this.movies = [...oldMovies, ...newMovies.results];
              // Backup the data so that it is still available if the user
              // switch views.
              this.tmdbService.searchedMovies$ = {
                isSearch: false,
                search: null,
                movies$: new Observable(observer => {
                  observer.next({
                    page: newMovies.page,
                    total_results: newMovies.total_results,
                    total_pages: newMovies.total_results,
                    results: this.movies,
                  });
                  observer.complete();
                }),
              };
              return this.movies;
            })
          );
        }
      });
      this.subscriptions.push(tmdbObserver);
    }
  }

  ngAfterViewInit() {
    // When new movies are loaded (from whatever source) the scroll position is
    // automatically set to top. When that happens, translate the scroll
    // to the original position (this is unnoticeable to the user, and
    // inevitable since MovieGrid/MovieList component is replaced with the
    // Loading component, losing the scroll position - which i backup - in the
    // process).
    // TODO: Calculate the ratio between gridView and listView scrollHeights,
    // and use it to keep the scroll position between view changes.
    this.gridView.changes.subscribe(gridView => {
      if (gridView.first) {
        this.movieGrid = gridView.first.scrollableMovies.nativeElement;
        // Scroll position is calculated while loading the movies since this
        // event fires after the view has changed.
        if (this.movieBottom && this.configuration.view === 'grid') {
          gridView.first.scrollTo(this.movieBottom.movieGridBottom);
        }
      }
    });
    this.listView.changes.subscribe(listView => {
      if (listView.first) {
        this.movieList = listView.first.scrollableMovies.nativeElement;
        if (this.movieBottom && this.configuration.view === 'list') {
          listView.first.scrollTo(this.movieBottom.movieListBottom);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(observer => observer.unsubscribe());
  }
}
