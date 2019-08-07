import { Component, OnInit } from '@angular/core';
import { MovieDetailsService } from '@services/movie-details.service';
import { TMDBMovieDetails } from '@models/tmdbmovie-details';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: TMDBMovieDetails = this.movieDetailsService.movie;
  movieImages: Array<string>;
  movieTrailers: Array<string>;
  mediaQuery = {
    imageSize: null,
    posterSize: null,
    videoHeight: null,
    videoWidth: null,
  };

  constructor(private movieDetailsService: MovieDetailsService) {
    this.movieTrailers = this.movie.videos.results
      .filter(video => video.type === 'Trailer')
      .map(video => video.key);
    this.movieImages = this.movie.images.backdrops.map(
      image => image.file_path
    );
    const mediaQuery = window.matchMedia(
      '(min-width: 320px) and (max-width: 767px)'
    );
    const matches = {
      imageSize: 's',
      posterSize: 'm',
      videoHeight: 170,
      videoWidth: 300,
    };
    const notMatches = {
      imageSize: 'm',
      posterSize: 'l',
      videoHeight: 440,
      videoWidth: 780,
    };
    this.mediaQuery = mediaQuery.matches ? matches : notMatches;
    mediaQuery.addEventListener('change', event => {
      this.mediaQuery = mediaQuery.matches ? matches : notMatches;
    });
  }

  ngOnInit() {}
}
