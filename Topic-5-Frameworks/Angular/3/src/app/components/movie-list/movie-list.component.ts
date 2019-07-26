import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
  movies: Object[];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  async removeMovie(movieID: number) {
    await this.moviesService.deleteMovie(movieID);
    this.movies = await this.moviesService.getAllMovies();
  }

  ngOnInit() {
    this.movies = this.route.snapshot.data.movies;
  }
}
