import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from '@models/configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  configuration$ = new BehaviorSubject<Configuration>(this.loadConfiguration());

  constructor() {}

  updateConfiguration(prop: string, value: string | boolean) {
    const oldConfiguration = this.loadConfiguration();
    const newConfiguration = oldConfiguration;
    newConfiguration[prop] = value;
    localStorage.setItem('configuration', JSON.stringify(newConfiguration));
    this.configuration$.next(newConfiguration);
  }

  loadConfiguration(): Configuration {
    const configuration = localStorage.getItem('configuration');
    // If it's the first time that the user loads the web application then
    // generate a default configuration.
    if (configuration === null) {
      const defaultConfiguration = new Configuration();
      localStorage.setItem(
        'configuration',
        JSON.stringify(defaultConfiguration)
      );
      return defaultConfiguration;
    }
    // Otherwise, load the user configuration.
    return JSON.parse(configuration);
  }
}
