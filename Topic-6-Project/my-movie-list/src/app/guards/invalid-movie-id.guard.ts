import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TMDBService } from '@services/tmdb.service';
import { map, catchError } from 'rxjs/operators';
import { MovieDetailsService } from '@services/movie-details.service';

@Injectable({
  providedIn: 'root',
})
export class InvalidMovieIDGuard implements CanActivate {
  constructor(
    private tmdbService: TMDBService,
    private router: Router,
    private movieDetailsService: MovieDetailsService
  ) {}

  isValidMovieID(movieID: number) {
    return this.tmdbService.movieDetails(movieID);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const movieID = next.params.movieID;
    return this.isValidMovieID(movieID).pipe(
      map(response => {
        // If the movie id is valid, then save the movie details in
        // MovieDetailsService and load the route.
        this.movieDetailsService.movie = response.body;
        return true;
      }),
      catchError(error => {
        // Otherwise, if the movie id is invalid, return to home.
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
