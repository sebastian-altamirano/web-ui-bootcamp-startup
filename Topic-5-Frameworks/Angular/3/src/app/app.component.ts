import { Component } from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular";
  floatingButtonIcon = "+";
  floatingButtonIsHidden = false;
  floatingButtonRoute = "/add";

  getIDfromURL(url) {
    return url.replace(/[a-z/]/g, "");
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.floatingButtonIcon = event.url === "/" ? "+" : "✎";
        // Floating button is hidden in "edit" and "add" routes.
        this.floatingButtonIsHidden =
          event.url === "/add" || event.url.includes("/edit/") ? true : false;
        // Floating button route is:
        // movie/:id if in edit/:id
        // add if anywhere else
        this.floatingButtonRoute = event.url.includes("/movie/")
          ? `/edit/${this.getIDfromURL(event.url)}`
          : "/add";
      }
    });
  }
}
