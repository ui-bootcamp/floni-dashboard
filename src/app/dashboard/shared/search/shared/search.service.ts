import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { SearchResult } from '../models/search-result.model';
import { map } from 'rxjs/operators';
import { MediaService } from '../../../media/shared/media.service';
import { NewsService } from '../../../news/shared/news.service';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private mediaService: MediaService,
    private newsService: NewsService,
    private userService: StorageService
  ) {}

  public search(searchTerm: string, scope: string): Observable<SearchResult[]> {
    const sources: Observable<unknown>[] = [];
    if (scope === 'media' || scope === 'global') {
      sources.push(
        this.mediaService.getAllAlbumsWhichContain(searchTerm),
        this.mediaService.getAllArtistsWhichContain(searchTerm),
        this.mediaService.getAllTracksWhichContain(searchTerm)
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
          result.favorite = this.userService.isFavorite(result.id, result.type);
          return result;
        });
      })
    );
  }
}
