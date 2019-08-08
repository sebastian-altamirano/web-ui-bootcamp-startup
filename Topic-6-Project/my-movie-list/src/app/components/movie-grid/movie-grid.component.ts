import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TMDBService } from '@services/tmdb.service';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
})
export class MovieGridComponent {
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
    const movieGrid = this.scrollableMovies.nativeElement;
    movieGrid.scroll(0, height);
  }
}
