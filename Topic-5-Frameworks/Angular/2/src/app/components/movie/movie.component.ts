import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Movie } from "../../models/movie";

@Component({
  selector: "movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"]
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() id: number;

  constructor() {}

  ngOnInit() {}
}
