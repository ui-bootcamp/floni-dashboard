import { Pipe, PipeTransform } from '@angular/core';
import { SearchResultType } from '../models/search-result-type.enum';

@Pipe({
  name: 'searchResultTypeToIcon'
})
export class SearchResultTypeToIconPipe implements PipeTransform {
  transform(value: SearchResultType): string {
    switch (value) {
      case SearchResultType.Track:
        return 'audiotrack';
      case SearchResultType.Album:
        return 'album';
      case SearchResultType.Artist:
        return 'face';
      case SearchResultType.Article:
        return 'receipt';
    }
  }
}
