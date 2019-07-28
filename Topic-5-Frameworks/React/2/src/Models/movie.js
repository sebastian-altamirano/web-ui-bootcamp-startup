export default class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  get durationInHours() {
    return this.duration ? this.duration.substring(1) + "hs" : "-";
  }
}
