import { MovieBackdropPipe } from './movie-backdrop.pipe';

describe('MovieBackdropPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieBackdropPipe();
    expect(pipe).toBeTruthy();
  });
});
