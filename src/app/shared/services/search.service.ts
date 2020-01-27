import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { SearchResult } from '../models/search-result.model';
import { MediaService } from './media.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private mediaService: MediaService) {}

  public search(searchString: string): Observable<SearchResult[]> {
    return combineLatest(
      this.mediaService.getAllAlbumsWith(searchString),
      this.mediaService.getAllArtistsWith(searchString),
      this.mediaService.getAllTracksWith(searchString)
    ).pipe(
      map(([firstResult, secondResult, thirdResult]) => {
        return [...firstResult, ...secondResult, ...thirdResult];
      })
    );
  }
}
