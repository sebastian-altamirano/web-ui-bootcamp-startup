export class SavedMovie {
  id: number;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  genre_ids: Array<number>;
  overview: string;
  release_date: string;

  constructor(
    id,
    vote_average,
    title,
    popularity,
    poster_path,
    genre_ids,
    overview,
    release_date
  ) {
    this.id = id;
    this.vote_average = vote_average;
    this.title = title;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.genre_ids = genre_ids;
    this.overview = overview;
    this.release_date = release_date;
  }
}
