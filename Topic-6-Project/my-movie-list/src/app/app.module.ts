import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from '@components/menu-bar/menu-bar.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { OptionsBarComponent } from '@components/options-bar/options-bar.component';
import { MoviesContainerComponent } from '@components//movies-container/movies-container.component';
import { MoviePosterPipe } from '@pipes/movie-poster.pipe';
import { MovieGridComponent } from '@components/movie-grid/movie-grid.component';
import { MovieGridItemComponent } from '@components/movie-grid-item/movie-grid-item.component';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { MovieListItemComponent } from '@components/movie-list-item/movie-list-item.component';
import { MovieGenresPipe } from '@pipes/movie-genres.pipe';
import { MoviesFilterPipe } from '@pipes/movies-filter.pipe';
import { ScrollEndDirective } from '@directives/scroll-end.directive';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { YoutubeVideoPipe } from './pipes/youtube-video.pipe';
import { MovieBackdropPipe } from './pipes/movie-backdrop.pipe';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { IsSavedMoviePipe } from './pipes/is-saved-movie.pipe';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    SearchBarComponent,
    OptionsBarComponent,
    MoviesContainerComponent,
    MoviePosterPipe,
    MovieGridComponent,
    MovieGridItemComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieGenresPipe,
    MoviesFilterPipe,
    ScrollEndDirective,
    MovieDetailComponent,
    YoutubeVideoPipe,
    MovieBackdropPipe,
    MoviePosterComponent,
    IsSavedMoviePipe,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
