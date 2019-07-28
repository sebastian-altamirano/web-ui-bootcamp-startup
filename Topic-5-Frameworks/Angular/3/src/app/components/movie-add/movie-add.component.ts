import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-add",
  templateUrl: "./movie-add.component.html",
  styleUrls: ["./movie-add.component.scss"]
})
export class MovieAddComponent implements OnInit {
  movie = { year: "", duration: "", title: "" };

  constructor(private moviesService: MoviesService, private router: Router) {}

  async addMovie() {
    await this.moviesService.addMovie(this.movie);
    this.router.navigate(["/"]);
  }

  ngOnInit() {}
}
