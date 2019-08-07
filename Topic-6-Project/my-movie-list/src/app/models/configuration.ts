export class Configuration {
  isAscendingOrder: boolean;
  filter: string;
  view: string;

  constructor() {
    this.isAscendingOrder = true;
    this.filter = 'popularity';
    this.view = 'grid';
  }
}
