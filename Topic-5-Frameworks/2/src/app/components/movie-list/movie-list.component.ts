import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models/movie";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
  movies: Movie[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.movies = this.route.snapshot.data.movies;
  }
}
