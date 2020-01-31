import { SearchResultType } from '../../shared/search/models/search-result-type.enum';

export class Artist {
  constructor(
    public id: number,
    public name: string,
    public createdAt: string,
    public updatedAt: string,
    public isFavorite: boolean,
    public type: SearchResultType = SearchResultType.Artist
  ) {}
}
