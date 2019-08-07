import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TMDBService } from '@services/tmdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit, OnDestroy {
  route: string = null;
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private tmdbService: TMDBService) {
    const routerObserver = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.route = event.url;
      });
    this.subscriptions.push(routerObserver);
  }

  loadPopularMovies() {
    if (this.route === '/' && this.tmdbService.search) {
      this.tmdbService.updateMovies(false);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(observer => observer.unsubscribe());
  }
}
