import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from '@components/movie-detail/movie-detail.component';
import { MoviesContainerComponent } from '@components/movies-container/movies-container.component';
import { InvalidMovieIDGuard } from '@guards/invalid-movie-id.guard';
import { AboutComponent } from '@components/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesContainerComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'movie/:movieID',
    canActivate: [InvalidMovieIDGuard],
    component: MovieDetailComponent,
  },
  {
    path: 'favorites',
    component: MoviesContainerComponent,
  },
  {
    path: 'to-watch',
    component: MoviesContainerComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
