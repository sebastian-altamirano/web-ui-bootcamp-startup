import { Pipe, PipeTransform } from '@angular/core';
import { TMDBService } from '@services/tmdb.service';
import { TMDBGenre } from '@models/tmdbgenre';

@Pipe({
  name: 'movieGenres',
})
export class MovieGenresPipe implements PipeTransform {
  constructor(private tmdbService: TMDBService) {}

  transform(genres: Array<number | TMDBGenre>): string {
    let movieGenres: string = null;
    if (genres && typeof genres[0] === 'number') {
      movieGenres = genres.reduce(
        (genreString: string, genreID: number, index: number) =>
          genreString +
          this.tmdbService.genres.find(genre => genre.id === genreID).name +
          (index < genres.length - 1 ? ' - ' : ''),
        ''
      );
    } else {
      movieGenres = genres
        .map((genre: TMDBGenre) => genre.name)
        .reduce(
          (result, genre, index) =>
            result + genre + (index < genres.length - 1 ? ' - ' : ''),
          ''
        );
    }
    return movieGenres;
  }
}
