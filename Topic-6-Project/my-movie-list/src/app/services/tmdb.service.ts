import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { TMDBGenre } from '@models/tmdbgenre';
import { TMDBMovieDetails } from '@models/tmdbmovie-details';
import { TMDBMovies } from '@models/tmdbmovies';
import { ImageConfiguration } from '@models/image-configuration';
import { TMDBConfiguration } from '@models/tmdbconfiguration';
import { apiKey } from 'assets/api-key';

@Injectable({
  providedIn: 'root',
})
export class TMDBService implements OnDestroy {
  apiUrl = 'https://api.themoviedb.org/3';
  configuration: ImageConfiguration;
  genres: TMDBGenre[];
  movies$ = new BehaviorSubject<{
    isSearch: boolean;
    search: string;
    movies$: Observable<TMDBMovies>;
  }>(this.popularMovies());
  page = 1;
  search: string = null;
  searchedMovies$: {
    isSearch: boolean;
    search: string;
    movies$: Observable<TMDBMovies>;
  };
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) {
    const params = {
      api_key: apiKey,
    };
    const imageConfigurationObserver = this.http
      .get<TMDBConfiguration>(`${this.apiUrl}/configuration`, { params })
      .subscribe(
        configuration =>
          (this.configuration = new ImageConfiguration(
            configuration.images.base_url,
            configuration.images.secure_base_url,
            configuration.images.backdrop_sizes,
            configuration.images.poster_sizes
          ))
      );
    const genresObserver = this.http
      .get<{ genres: Array<TMDBGenre> }>(`${this.apiUrl}/genre/movie/list`, {
        params,
      })
      .subscribe(genres => (this.genres = genres.genres));
    this.subscriptions.push(imageConfigurationObserver);
    this.subscriptions.push(genresObserver);
  }

  movieDetails(movieID: number) {
    const params = {
      api_key: apiKey,
      append_to_response: 'videos,images',
    };
    return this.http.get<TMDBMovieDetails>(`${this.apiUrl}/movie/${movieID}`, {
      observe: 'response',
      params,
    });
  }

  popularMovies(page: number = 1) {
    const params = {
      api_key: apiKey,
      page: page.toString(),
    };
    return {
      isSearch: false,
      search: null,
      movies$: this.http.get<TMDBMovies>(`${this.apiUrl}/discover/movie`, {
        params,
      }),
    };
  }

  searchMovie(search: string, page: number) {
    const params = {
      api_key: apiKey,
      query: search,
      page: page.toString(),
    };
    return {
      isSearch: true,
      search,
      movies$: this.http.get(`${this.apiUrl}/search/movie`, { params }),
    };
  }

  updateMovies(isSearch: boolean, search: string = null) {
    let newMovies = null;
    if (isSearch) {
      if (!(this.search !== null && this.search === search)) {
        this.page = 1;
      }
      newMovies = this.searchMovie(search, this.page);
    } else {
      newMovies = this.popularMovies(this.page);
    }
    this.movies$.next(newMovies);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(observer => observer.unsubscribe());
  }
}
