import { Component } from '@angular/core';
import { ConfigurationService } from '@services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MyMovieList';

  constructor(private configurationService: ConfigurationService) {
    this.configurationService.loadConfiguration();
  }
}
