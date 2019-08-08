import { IsSavedMoviePipe } from './is-saved-movie.pipe';

describe('IsSavedMoviePipe', () => {
  it('create an instance', () => {
    const pipe = new IsSavedMoviePipe();
    expect(pipe).toBeTruthy();
  });
});
