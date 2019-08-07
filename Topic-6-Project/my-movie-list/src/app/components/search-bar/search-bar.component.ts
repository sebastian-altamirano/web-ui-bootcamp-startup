import { Component, OnInit, OnDestroy } from '@angular/core';
import { TMDBService } from '@services/tmdb.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { SavedMoviesService } from '@services/saved-movies.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  search = '';
  debouncedSearch = new Subject<string>();
  canGoBack: boolean;
  route: string;
  subscriptions: Subscription[] = [];

  constructor(
    private tmbdService: TMDBService,
    private savedMoviesService: SavedMoviesService,
    private router: Router,
    private location: Location
  ) {
    const debouncedSearchObserver = this.debouncedSearch
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(newSearch => this.searchMovies(newSearch));
    const routerObserver = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.route = event.url;
        this.canGoBack = !event.url.includes('/movie/');
      });
    this.subscriptions.push(debouncedSearchObserver);
    this.subscriptions.push(routerObserver);
  }

  goBack() {
    this.location.back();
  }

  searchMovies(newSearch) {
    const unformattedSearch = newSearch.replace(/\s+/g, '');
    if (unformattedSearch.length !== 0) {
      this.tmbdService.updateMovies(true, newSearch);
    }
  }

  updateSearch(newSearch) {
    if (this.route === '/favorites' || this.route === '/to-watch') {
      this.savedMoviesService.updated.next(newSearch);
    } else {
      this.debouncedSearch.next(newSearch);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(observer => observer.unsubscribe());
  }
}
