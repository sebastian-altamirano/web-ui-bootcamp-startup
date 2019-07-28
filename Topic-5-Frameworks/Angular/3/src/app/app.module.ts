import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieComponent } from "./components/movie/movie.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { FloatingButtonComponent } from "./components/floating-button/floating-button.component";
import { MovieAddComponent } from "./components/movie-add/movie-add.component";
import { MovieEditComponent } from "./components/movie-edit/movie-edit.component";
import { MoviesResolverService } from "./services/movies-resolver.service";
import { MovieResolverService } from "./services/movie-resolver.service";
import { InvalidMovieIDGuard } from "./guards/invalid-movie-id.guard";

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    MovieDetailComponent,
    FloatingButtonComponent,
    MovieAddComponent,
    MovieEditComponent
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule],
  providers: [MovieResolverService, MoviesResolverService, InvalidMovieIDGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
