import { anything, instance, mock, verify, when } from 'ts-mockito';
import { MediaService } from '../../../media/shared/media.service';
import { NewsService } from '../../../news/shared/news.service';
import { SearchService } from './search.service';
import { StorageService } from '../../services/storage.service';
import { SearchResult } from '../models/search-result.model';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { SearchResultType } from '../models/search-result-type.enum';

describe('SearchService', () => {
  let mockMediaService: MediaService;
  let mockNewsService: NewsService;
  let mockUserService: StorageService;
  let service: SearchService;

  beforeEach(() => {
    mockMediaService = mock(MediaService);
    mockNewsService = mock(NewsService);
    mockUserService = mock(StorageService);
    when(mockMediaService.getAllTracksWhichContain(anything())).thenReturn(
      of([new SearchResult(9, 'THE TRACK', '', SearchResultType.Track)])
    );
    when(mockMediaService.getAllAlbumsWhichContain(anything())).thenReturn(
      of([new SearchResult(10, 'THE ALBUM', '', SearchResultType.Album)])
    );
    when(mockMediaService.getAllArtistsWhichContain(anything())).thenReturn(
      of([new SearchResult(11, 'THE ARTIST', '', SearchResultType.Artist)])
    );
    when(mockNewsService.getArticlesWith(anything())).thenReturn(
      of([new SearchResult(12, 'THE ARTICLE', '', SearchResultType.Article)])
    );
    when(mockUserService.isFavorite(anything(), anything())).thenReturn(false);
    service = new SearchService(
      instance(mockMediaService),
      instance(mockNewsService),
      instance(mockUserService)
    );
  });

  test('should call getAllTracksWith from media service and getArticlesWith from news service with scope global', fakeAsync(() => {
    service.search('xxxxxxxx', 'global').subscribe();
    tick();
    verify(mockMediaService.getAllTracksWhichContain(anything())).once();
    verify(mockNewsService.getArticlesWith(anything())).once();
  }));

  test('should not call getArticlesWith from news service with scope media', fakeAsync(() => {
    service.search('xxxxxxxx', 'media').subscribe();
    tick();
    verify(mockNewsService.getArticlesWith(anything())).never();
  }));

  test('should not call getAllTracksWith from media service with scope news', fakeAsync(() => {
    service.search('xxxxxxxx', 'news').subscribe();
    tick();
    verify(mockMediaService.getAllTracksWhichContain(anything())).never();
  }));

  test('should return results from media and news service', fakeAsync(() => {
    service.search('the', 'global').subscribe(res => {
      expect(res.length).toBe(4);
    });
    tick();
  }));

  test('should only return results from media service with scope media', fakeAsync(() => {
    service.search('the', 'media').subscribe(res => {
      expect(res.length).toBe(3);
      expect(
        res.findIndex(x => x.type === SearchResultType.Article)
      ).toBeLessThan(0);
    });
    tick();
  }));
});
