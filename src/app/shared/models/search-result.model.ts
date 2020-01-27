import { SearchResultType } from './search-result-type.enum';

export class SearchResult {
  constructor(
    private id: number,
    private name: string,
    private context: string,
    private type: SearchResultType
  ) {}

  get title() {
    return this.name;
  }

  get identifier() {
    return this.id;
  }

  get additionalInformation() {
    return this.context;
  }

  set additionalInformation(newContext) {
    this.context = newContext;
  }

  get searchResultType() {
    return this.type;
  }
}
