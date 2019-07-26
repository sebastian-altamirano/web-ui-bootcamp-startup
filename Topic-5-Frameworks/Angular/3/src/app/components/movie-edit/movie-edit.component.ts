import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.scss"]
})
export class MovieEditComponent implements OnInit {
  movie: Object;
  movieID = Number(this.route.snapshot.params.id);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  goBack() {
    this.router.navigate([`/movie/${this.movieID}`]);
  }

  async updateMovie() {
    await this.moviesService.updateMovie(this.movieID, this.movie);
    this.goBack();
  }

  ngOnInit() {
    this.movie = this.route.snapshot.data.movie;
  }
}
