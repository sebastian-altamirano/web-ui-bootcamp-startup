import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { MoviesService } from "./movies.service";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: "root"
})
export class MoviesResolverService implements Resolve<Movie[]> {
  constructor(private moviesService: MoviesService) {}

  resolve() {
    return this.moviesService.getAllMovies();
  }
}
