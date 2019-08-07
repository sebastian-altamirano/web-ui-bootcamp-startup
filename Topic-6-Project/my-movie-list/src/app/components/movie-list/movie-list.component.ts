import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { TMDBService } from '@services/tmdb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  @Input() isSearch: boolean;
  @Input() movies: Array<object>;

  @ViewChild('scrollableMovies', { static: false })
  scrollableMovies: ElementRef;

  constructor(private tmdbService: TMDBService) {}

  loadMoreMovies() {
    ++this.tmdbService.page;
    this.tmdbService.updateMovies(this.isSearch, this.tmdbService.search);
  }

  scrollTo(height: number) {
    const movieList = this.scrollableMovies.nativeElement;
    movieList.scroll(0, height);
  }
}
