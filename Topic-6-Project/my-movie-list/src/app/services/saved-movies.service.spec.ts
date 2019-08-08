import { TestBed } from '@angular/core/testing';

import { SavedMoviesService } from './saved-movies.service';

describe('SavedMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavedMoviesService = TestBed.get(SavedMoviesService);
    expect(service).toBeTruthy();
  });
});
