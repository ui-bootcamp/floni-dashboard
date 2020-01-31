import { SearchResultType } from '../../shared/search/models/search-result-type.enum';

export class Track {
  constructor(
    public id: number,
    public albumId: number,
    public artistId: number,
    public title: string,
    public duration: number,
    public createdAt: string,
    public updatedAt: string,
    public isFavorite: boolean,
    public type: SearchResultType = SearchResultType.Track
  ) {}
}
