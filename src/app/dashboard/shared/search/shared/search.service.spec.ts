import { anything, instance, mock, verify, when } from 'ts-mockito';
import { MediaService } from '../../../media/shared/media.service';
import { NewsService } from '../../../news/shared/news.service';
import { SearchService } from './search.service';
import { StorageService } from '../../services/storage.service';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { Track } from '../../../media/models/track.model';
import { Album } from '../../../media/models/album.model';
import { Artist } from '../../../media/models/artist.model';
import { Article } from '../../../news/models/article.model';

describe('SearchService', () => {
  let mockMediaService: MediaService;
  let mockNewsService: NewsService;
  let mockStorageService: StorageService;
  let service: SearchService;

  beforeEach(() => {
    mockMediaService = mock(MediaService);
    mockNewsService = mock(NewsService);
    mockStorageService = mock(StorageService);
    when(mockMediaService.getAllTracksWhichContain$(anything())).thenReturn(
      of([new Track(9, 9, 9, 'THE TRACK', 123, '', '')])
    );
    when(mockMediaService.getAllAlbumsWhichContain$(anything())).thenReturn(
      of([new Album(10, 10, 'THE ALBUM', '', '', '', '', '', '', '')])
    );
    when(mockMediaService.getAllArtistsWhichContain$(anything())).thenReturn(
      of([new Artist(11, 'THE ARTIST', '', '')])
    );
    when(mockNewsService.getArticlesWhichContain$(anything())).thenReturn(
      of([new Article(12, 'THE ARTICLE', '', '', '', '')])
    );
    when(mockStorageService.isFavorite(anything())).thenReturn(false);
    service = new SearchService(
      instance(mockMediaService),
      instance(mockNewsService),
      instance(mockStorageService)
    );
  });

  test('should call getAllTracksWith from media service and getArticlesWhichContain from news service with scope global', fakeAsync(() => {
    service.search$('xxxxxxxx', 'global').subscribe();
    tick();
    verify(mockMediaService.getAllTracksWhichContain$(anything())).once();
    verify(mockNewsService.getArticlesWhichContain$(anything())).once();
  }));

  test('should not call getArticlesWhichContain from news service with scope media', fakeAsync(() => {
    service.search$('xxxxxxxx', 'media').subscribe();
    tick();
    verify(mockNewsService.getArticlesWhichContain$(anything())).never();
  }));

  test('should not call getAllTracksWith from media service with scope news', fakeAsync(() => {
    service.search$('xxxxxxxx', 'news').subscribe();
    tick();
    verify(mockMediaService.getAllTracksWhichContain$(anything())).never();
  }));

  test('should return results from media and news service', fakeAsync(() => {
    service.search$('the', 'global').subscribe(res => {
      expect(res.length).toBe(4);
    });
    tick();
  }));

  test('should only return results from media service with scope media', fakeAsync(() => {
    service.search$('the', 'media').subscribe(res => {
      expect(res.length).toBe(3);
    });
    tick();
  }));
});
