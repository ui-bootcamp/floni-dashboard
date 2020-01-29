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

  public search(searchString: string): Observable<SearchResult[]> {
    return combineLatest(
      this.mediaService.getAllAlbumsWith(searchString),
      this.mediaService.getAllArtistsWith(searchString),
      this.mediaService.getAllTracksWith(searchString),
      this.newsService.getArticlesWith(searchString)
    ).pipe(
      map(([albums, artists, tracks, articles]) => {
        return [...albums, ...artists, ...tracks, ...articles];
      }),
      map(searchResults => {
        return searchResults.map(singleResult => {
          singleResult.isFavorite = this.userService.isFavorite(
            singleResult.identifier,
            singleResult.searchResultType
          );
          return singleResult;
        });
      })
    );
  }
}
