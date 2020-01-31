import { SearchResultType } from './search-result-type.enum';

export class SearchResult {
  constructor(
    public id: number,
    public name: string,
    public metaInformations: string,
    public type: SearchResultType,
    public favorite: boolean = false,
    public imageUrl: string = ''
  ) {}
}
