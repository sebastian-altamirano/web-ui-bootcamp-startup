export class ImageConfiguration {
  baseUrl: string;
  secureBaseUrl: string;
  backdropSizes: Array<string>;
  posterSizes: Array<string>;

  constructor(baseUrl, secureBaseUrl, backdropSizes, posterSizes) {
    this.baseUrl = baseUrl;
    this.secureBaseUrl = secureBaseUrl;
    this.backdropSizes = backdropSizes;
    this.posterSizes = posterSizes;
  }
}
