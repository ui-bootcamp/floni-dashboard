import { FavoriteIconPipe } from './favorite-icon.pipe';

describe('FavoriteIconPipe', () => {
  it('for favorite return empty heart', () => {
    const pipe = new FavoriteIconPipe();
    expect(pipe.transform(true)).toEqual('favorite_border');
  });
});
