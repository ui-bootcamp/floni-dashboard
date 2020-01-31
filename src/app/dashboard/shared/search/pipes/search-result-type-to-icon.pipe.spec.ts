import { SearchResultTypeToIconPipe } from './search-result-type-to-icon.pipe';
import { SearchResultType } from '../models/search-result-type.enum';

describe('SearchResultTypeToIconPipe', () => {
  test('should return receipt for article type', () => {
    const pipe = new SearchResultTypeToIconPipe();
    expect(pipe.transform(SearchResultType.Article)).toEqual('receipt');
  });

  test('should return undefined for unknown type', () => {
    const pipe = new SearchResultTypeToIconPipe();
    expect(pipe.transform(100)).toBeUndefined();
  });
});
