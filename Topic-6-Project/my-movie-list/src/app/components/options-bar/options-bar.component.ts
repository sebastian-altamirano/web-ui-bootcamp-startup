import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationService } from '@services/configuration.service';
import { Configuration } from '@models/configuration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss'],
})
export class OptionsBarComponent implements OnInit, OnDestroy {
  configuration: Configuration;
  orderButtonIcon: string;
  subscriptions: Subscription[] = [];

  constructor(private configurationService: ConfigurationService) {
    const configurationObserver = this.configurationService.configuration$.subscribe(
      newConfiguration => {
        this.configuration = newConfiguration;
        this.orderButtonIcon = `arrow_drop_${
          newConfiguration.isAscendingOrder ? 'down' : 'up'
        }`;
      }
    );
    this.subscriptions.push(configurationObserver);
  }

  changeFilter(newFilter: string) {
    this.configurationService.updateConfiguration('filter', newFilter);
  }

  changeOrder(newOrder: boolean) {
    this.configurationService.updateConfiguration('isAscendingOrder', newOrder);
  }

  changeView(newView: string) {
    this.configurationService.updateConfiguration('view', newView);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(observer => observer.unsubscribe());
  }
}
