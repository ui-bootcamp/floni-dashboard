import { SearchResultType } from '../../shared/search/models/search-result-type.enum';

export class Album {
  constructor(
    public id: number,
    public artistId: number,
    public name: string,
    public cover: string,
    public coverSmall: string,
    public coverMedium: string,
    public coverBig: string,
    public coverXL: string,
    public createdAt: string,
    public updatedAt: string,
    public isFavorite: boolean,
    public type: SearchResultType = SearchResultType.Album
  ) {}
}
