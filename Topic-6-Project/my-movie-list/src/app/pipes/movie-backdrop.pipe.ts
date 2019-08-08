import { Pipe, PipeTransform } from '@angular/core';
import { TMDBService } from '@services/tmdb.service';

@Pipe({
  name: 'movieBackdrop',
})
export class MovieBackdropPipe implements PipeTransform {
  constructor(private tmdbService: TMDBService) {}

  transform(movie: string, size: string = 'm'): string {
    enum Size {
      's',
      'm',
      'l',
      'original',
    }
    const url = this.tmdbService.configuration.secureBaseUrl;
    const backdropSize = this.tmdbService.configuration.backdropSizes[
      Size[size]
    ];
    return url + backdropSize + movie;
  }
}
