import { SearchResultType } from './search-result-type.enum';

export class SearchResult {
  constructor(
    private id: number,
    private name: string,
    private context: string,
    private type: SearchResultType,
    private favorite: boolean = false
  ) {}

  get title() {
    return this.name;
  }

  get identifier() {
    return this.id;
  }

  get isFavorite() {
    return this.favorite;
  }

  set isFavorite(newValue: boolean) {
    this.favorite = newValue;
  }

  get additionalInformation() {
    return this.context;
  }

  set additionalInformation(newContext: string) {
    this.context = newContext;
  }

  get searchResultType() {
    return this.type;
  }
}
