export class Movie {
  title: string;
  year: number;
  duration: number;

  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  get durationInHours(): string {
    const hours: number = Math.trunc(this.duration / 60);
    const minutes: number = this.duration % 60;
    return `${hours}:${minutes >= 10 ? minutes : "0" + minutes}hs`;
  }
}
