import { SearchResultTypeToIconPipe } from './search-result-type-to-icon.pipe';
import { SearchResultType } from '../models/search-result-type.enum';

describe('SearchResultTypeToIconPipe', () => {
  it('should return receipt string for article', () => {
    const pipe = new SearchResultTypeToIconPipe();
    expect(pipe.transform(SearchResultType.Article)).toEqual('receipt');
  });

  it('should return undefined for unknown type', () => {
    const pipe = new SearchResultTypeToIconPipe();
    expect(pipe.transform(100)).toBeUndefined();
  });
});
