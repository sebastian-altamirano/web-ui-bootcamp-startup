import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MovieAddComponent } from "./components/movie-add/movie-add.component";
import { MovieEditComponent } from "./components/movie-edit/movie-edit.component";
import { MoviesResolverService } from "./services/movies-resolver.service";
import { MovieResolverService } from "./services/movie-resolver.service";
import { InvalidMovieIDGuard } from "./guards/invalid-movie-id.guard";

const routes: Routes = [
  {
    path: "",
    component: MovieListComponent,
    resolve: {
      movies: MoviesResolverService
    }
  },
  {
    path: "movie/:id",
    component: MovieDetailComponent,
    canActivate: [InvalidMovieIDGuard],
    resolve: {
      movie: MovieResolverService
    }
  },
  { path: "add", component: MovieAddComponent },
  {
    path: "edit/:id",
    canActivate: [InvalidMovieIDGuard],
    component: MovieEditComponent,
    resolve: {
      movie: MovieResolverService
    }
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
