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
import PlaceResult = google.maps.places.PlaceResult;
import { MapService } from '../../../map/shared/map.service';
import { MapMarkerService } from '../../../map/shared/mapMarker.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private readonly mediaService: MediaService,
    private readonly newsService: NewsService,
    private readonly storageService: StorageService,
    private readonly mapService: MapService,
    private readonly mapMarkerService: MapMarkerService
  ) {}

  public search$(
    searchTerm: string,
    scope: string
  ): Observable<(Artist | Album | Track | Article | PlaceResult)[]> {
    const sources$: Observable<
      Artist[] | Album[] | Track[] | Article[] | PlaceResult[]
    >[] = [];
    if (scope === 'media' || scope === 'global') {
      sources$.push(
        this.mediaService.getAllAlbumsWhichContain$(searchTerm),
        this.mediaService.getAllArtistsWhichContain$(searchTerm),
        this.mediaService.getAllTracksWhichContain$(searchTerm)
      );
    }
    if (scope === 'news' || scope === 'global') {
      sources$.push(this.newsService.getArticlesWhichContain$(searchTerm));
    }

    if (scope === 'map' || scope === 'global') {
      this.mapService.findNearbyLocations('restaurant');
      sources$.push(this.mapMarkerService.nextMarker$);
    }

    return combineLatest(...sources$).pipe(
      map(arrays => {
        return [].concat.apply([], arrays);
      }),
      map(searchResults => {
        return searchResults.map(
          (result: Artist | Album | Track | Article | PlaceResult) => {
            // @ts-ignore
            result.isFavorite = this.storageService.isFavorite(result);
            return result;
          }
        );
      })
    );
  }
}
