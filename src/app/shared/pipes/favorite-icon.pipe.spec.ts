import { FavoriteIconPipe } from './favorite-icon.pipe';

describe('FavoriteIconPipe', () => {
  it('for favorite return heart', () => {
    const pipe = new FavoriteIconPipe();
    expect(pipe.transform(true)).toEqual('favorite');
  });
});
