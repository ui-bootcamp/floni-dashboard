import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaService } from '../../../media/shared/media.service';
import { NewsService } from '../../../news/shared/news.service';
import { StorageService } from '../../services/storage.service';
import { Artist } from '../../../media/models/artist.model';
import { Album } from '../../../media/models/album.model';
import { Track } from '../../../media/models/track.model';
import { Article } from '../../../news/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private mediaService: MediaService,
    private newsService: NewsService,
    private userService: StorageService
  ) {}

  public search(
    searchTerm: string,
    scope: string
  ): Observable<(Artist | Album | Track | Article)[]> {
    const sources: Observable<Artist[] | Album[] | Track[] | Article[]>[] = [];
    if (scope === 'media' || scope === 'global') {
      sources.push(
        this.mediaService.getAllAlbumsWhichContain(searchTerm),
        this.mediaService.getAllArtistsWhichContain(searchTerm),
        this.mediaService.getAllTracksWhichContain(searchTerm)
      );
    }
    if (scope === 'news' || scope === 'global') {
      sources.push(this.newsService.getArticlesWhichContain(searchTerm));
    }

    return combineLatest(...sources).pipe(
      map(arrays => {
        return [].concat.apply([], arrays);
      }),
      map(searchResults => {
        return searchResults.map((result: Artist | Album | Track | Article) => {
          result.isFavorite = this.userService.isFavorite(result);
          return result;
        });
      })
    );
  }
}
