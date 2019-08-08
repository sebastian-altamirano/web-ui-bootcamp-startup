import { TestBed, async, inject } from '@angular/core/testing';

import { InvalidMovieIDGuard } from './invalid-movie-id.guard';

describe('InvalidMovieIDGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvalidMovieIDGuard],
    });
  });

  it('should ...', inject(
    [InvalidMovieIDGuard],
    (guard: InvalidMovieIDGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
