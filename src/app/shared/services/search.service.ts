import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { SearchResult } from '../models/search-result.model';
import { MediaService } from './media.service';
import { map } from 'rxjs/operators';
import { NewsService } from './news.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private mediaService: MediaService,
    private newsService: NewsService,
    private userService: UserService
  ) {}

  public search(searchTerm: string, scope: string): Observable<SearchResult[]> {
    const sources: Observable<unknown>[] = [];
    if (scope === 'media' || scope === 'global') {
      sources.push(
        this.mediaService.getAllAlbumsWith(searchTerm),
        this.mediaService.getAllArtistsWith(searchTerm),
        this.mediaService.getAllTracksWith(searchTerm)
      );
    }
    if (scope === 'news' || scope === 'global') {
      sources.push(this.newsService.getArticlesWith(searchTerm));
    }

    return combineLatest(...sources).pipe(
      map(arrays => {
        return [].concat.apply([], arrays);
      }),
      map(searchResults => {
        return searchResults.map((result: SearchResult) => {
          result.isFavorite = this.userService.isFavorite(
            result.identifier,
            result.searchResultType
          );
          return result;
        });
      })
    );
  }
}
