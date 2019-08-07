import { TMDBGenre } from './tmdbgenre';
import { TMDBCompany } from './tmdbcompany';
import { TMDBCountry } from './tmdbcountry';
import { TMDBLanguage } from './tmdblanguage';
import { TMDBVideos } from './tmdbvideos';
import { TMDBCollection } from './tmdbcollection';
import { TMDBImages } from './tmdbimages';

export interface TMDBMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: TMDBCollection;
  budget: number;
  genres: Array<TMDBGenre>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<TMDBCompany>;
  production_countries: Array<TMDBCountry>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<TMDBLanguage>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: TMDBVideos;
  images: TMDBImages;
}
