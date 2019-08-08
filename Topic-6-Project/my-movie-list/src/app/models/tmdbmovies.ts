import { TMDBMovie } from './tmdbmovie';

export interface TMDBMovies {
  page: number;
  total_results: number;
  total_pages: number;
  results: TMDBMovie[];
}
