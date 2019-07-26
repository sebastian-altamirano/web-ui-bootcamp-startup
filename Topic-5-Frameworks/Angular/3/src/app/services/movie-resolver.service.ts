import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { MoviesService } from "./movies.service";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: "root"
})
export class MovieResolverService implements Resolve<Movie> {
  constructor(private moviesService: MoviesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const movieID = Number(route.paramMap.get("id"));
    return this.moviesService.getMovie(movieID);
  }
}
