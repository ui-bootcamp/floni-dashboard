import { FavoriteIconPipe } from './favorite-icon.pipe';

describe('FavoriteIconPipe', () => {
  test('should return heart for favorite', () => {
    const pipe = new FavoriteIconPipe();
    expect(pipe.transform(true)).toEqual('favorite');
  });

  test('should return nothing for non favorite', () => {
    const pipe = new FavoriteIconPipe();
    expect(pipe.transform(false)).toEqual('');
  });
});
