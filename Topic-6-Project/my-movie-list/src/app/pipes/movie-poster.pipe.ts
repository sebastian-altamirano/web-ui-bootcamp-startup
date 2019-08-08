import { Pipe, PipeTransform } from '@angular/core';
import { TMDBService } from '@services/tmdb.service';

@Pipe({
  name: 'moviePoster',
})
export class MoviePosterPipe implements PipeTransform {
  constructor(private tmdbService: TMDBService) {}

  transform(movie: string, size: string = 'm'): string {
    let moviePoster: string = null;
    if (movie) {
      enum Size {
        'xs',
        's',
        'm',
        'l',
        'xl',
        'xxl',
        'original',
      }
      const url = this.tmdbService.configuration.secureBaseUrl;
      const posterSize = this.tmdbService.configuration.posterSizes[Size[size]];
      moviePoster = url + posterSize + movie;
    } else {
      moviePoster = 'assets/image-not-available.png';
    }
    return moviePoster;
  }
}
