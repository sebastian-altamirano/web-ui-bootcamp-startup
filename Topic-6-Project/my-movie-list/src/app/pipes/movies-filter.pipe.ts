import { Pipe, PipeTransform } from '@angular/core';
import { TMDBMovie } from '@models/tmdbmovie';

@Pipe({
  name: 'moviesFilter',
})
export class MoviesFilterPipe implements PipeTransform {
  constructor() {}

  getSortFunction(propertyToFilter: string, isAscendingOrder: boolean) {
    const comparison = isAscendingOrder
      ? { true: -1, false: 1 }
      : { true: 1, false: -1 };
    if (propertyToFilter === 'title') {
      if (isAscendingOrder) {
        return (firstMovie: TMDBMovie, secondMovie: TMDBMovie) =>
          firstMovie.title.localeCompare(secondMovie.title);
      } else {
        return (firstMovie: TMDBMovie, secondMovie: TMDBMovie) =>
          secondMovie.title.localeCompare(firstMovie.title);
      }
    } else if (propertyToFilter === 'release_date') {
      return (firstMovie: TMDBMovie, secondMovie: TMDBMovie) => {
        const firstMovieDate = new Date(firstMovie[propertyToFilter]);
        const secondMovieDate = new Date(secondMovie[propertyToFilter]);
        return firstMovieDate <= secondMovieDate
          ? comparison.true
          : comparison.false;
      };
    } else {
      return (firstMovie: TMDBMovie, secondMovie: TMDBMovie) => {
        return firstMovie[propertyToFilter] <= secondMovie[propertyToFilter]
          ? comparison.true
          : comparison.false;
      };
    }
  }

  transform(
    movies: Array<TMDBMovie>,
    propertyToFilter: string,
    isAscendingOrder: boolean
  ) {
    const filteringFunction = this.getSortFunction(
      propertyToFilter,
      isAscendingOrder
    );
    movies.sort(filteringFunction);
    return movies;
  }
}
