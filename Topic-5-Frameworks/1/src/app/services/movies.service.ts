import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  // Since there's no way to add or remove movies outside of the code, this way
  // of storing data is persistent. This will be replaced by IndexedDB at point
  // 3.
  movies: Movie[] = [
    new Movie("Fake Movie 1", 2005, 227),
    new Movie("Fake Movie 2", 1998, 152),
    new Movie("Fake Movie 3", 2007, 189),
    new Movie("Fake Movie 4", 2008, 211)
  ];
}
