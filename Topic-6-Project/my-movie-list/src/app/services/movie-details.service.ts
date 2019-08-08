import { Injectable } from '@angular/core';
import { TMDBMovieDetails } from '@models/tmdbmovie-details';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  movie: TMDBMovieDetails;

  constructor() {}
}
