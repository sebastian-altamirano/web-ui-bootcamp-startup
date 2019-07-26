import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieComponent } from "./components/movie/movie.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MoviesResolverService } from "./services/movies-resolver.service";
import { MovieResolverService } from "./services/movie-resolver.service";
import { InvalidMovieIDGuard } from "./guards/invalid-movie-id.guard";

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    MovieDetailComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [MovieResolverService, MoviesResolverService, InvalidMovieIDGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
