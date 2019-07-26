export default class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  get durationInHours() {
    const hours = Math.trunc(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours}:${minutes >= 10 ? minutes : "0" + minutes}hs`;
  }
}
