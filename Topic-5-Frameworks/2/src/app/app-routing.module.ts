import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MoviesResolverService } from "./services/movies-resolver.service";
import { MovieResolverService } from "./services/movie-resolver.service";
import { InvalidMovieIDGuard } from "./guards/invalid-movie-id.guard";

const routes: Routes = [
  {
    path: "",
    resolve: {
      movies: MoviesResolverService
    },
    component: MovieListComponent
  },
  {
    path: "movie/:id",
    resolve: {
      movie: MovieResolverService
    },
    canActivate: [InvalidMovieIDGuard],
    component: MovieDetailComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
