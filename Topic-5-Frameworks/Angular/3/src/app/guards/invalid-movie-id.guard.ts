import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { MoviesService } from "../services/movies.service";

@Injectable({
  providedIn: "root"
})
export class InvalidMovieIDGuard implements CanActivate {
  constructor(private router: Router, private moviesService: MoviesService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.moviesService.isValidMovieID) return true;
    this.router.navigate(["/"]);
    return false;
  }
}
