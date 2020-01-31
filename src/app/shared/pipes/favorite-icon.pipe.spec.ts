import { FavoriteIconPipe } from './favorite-icon.pipe';

describe('FavoriteIconPipe', () => {
  test('for favorite return heart', () => {
    const pipe = new FavoriteIconPipe();
    expect(pipe.transform(true)).toEqual('favorite');
  });

  test('should return nothing for non favorite', () => {
    const pipe = new FavoriteIconPipe();
    expect(pipe.transform(false)).toEqual('');
  });
});
