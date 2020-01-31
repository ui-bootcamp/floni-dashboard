import { SearchResultType } from '../../shared/search/models/search-result-type.enum';

export class Article {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public link: string,
    public createdAt: string,
    public updatedAt: string,
    public isFavorite: boolean,
    public type: SearchResultType = SearchResultType.Article
  ) {}
}
