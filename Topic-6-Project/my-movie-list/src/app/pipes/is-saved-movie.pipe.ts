import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSavedMovie',
})
export class IsSavedMoviePipe implements PipeTransform {
  transform(movieID: number, savedMovieIDs: Array<number>): boolean {
    return movieID in savedMovieIDs;
  }
}
