import { anything, instance, mock, verify, when } from 'ts-mockito';
import { MediaService } from './media.service';
import { NewsService } from './news.service';
import { SearchService } from './search.service';
import { UserService } from './user.service';
import { SearchResult } from '../models/search-result.model';
import { Observable, of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { SearchResultType } from '../models/search-result-type.enum';

describe('SearchService', () => {
  let mockMediaService: MediaService;
  let mockNewsService: NewsService;
  let mockUserService: UserService;
  let service: SearchService;

  beforeEach(() => {
    mockMediaService = mock(MediaService);
    mockNewsService = mock(NewsService);
    mockUserService = mock(UserService);
    when(mockMediaService.getAllTracksWith(anything())).thenReturn(
      new Observable<SearchResult[]>()
    );
    when(mockMediaService.getAllAlbumsWith(anything())).thenReturn(
      new Observable<SearchResult[]>()
    );
    when(mockMediaService.getAllArtistsWith(anything())).thenReturn(
      new Observable<SearchResult[]>()
    );
    when(mockNewsService.getArticlesWith(anything())).thenReturn(
      new Observable<SearchResult[]>()
    );
    when(mockUserService.isFavorite(anything(), anything())).thenReturn(false);
    service = new SearchService(
      instance(mockMediaService),
      instance(mockNewsService),
      instance(mockUserService)
    );
  });

  test('global search should call NewService and MediaService', fakeAsync(() => {
    service.search('xxxxxxxx', 'global').subscribe(res => {
      expect(res.length).toBe(0);
    });
    tick();
    verify(mockMediaService.getAllTracksWith(anything())).once();
    verify(mockMediaService.getAllAlbumsWith(anything())).once();
    verify(mockMediaService.getAllArtistsWith(anything())).once();
    verify(mockNewsService.getArticlesWith(anything())).once();
  }));

  test('media search should call only  MediaService', fakeAsync(() => {
    service.search('xxxxxxxx', 'media').subscribe(res => {
      expect(res.length).toBe(0);
    });
    tick();
    verify(mockMediaService.getAllTracksWith(anything())).once();
    verify(mockMediaService.getAllAlbumsWith(anything())).once();
    verify(mockMediaService.getAllArtistsWith(anything())).once();
    verify(mockNewsService.getArticlesWith(anything())).never();
  }));

  test('news search should only call NewsService', fakeAsync(() => {
    service.search('xxxxxxxx', 'news').subscribe(res => {
      expect(res.length).toBe(0);
    });
    tick();
    verify(mockMediaService.getAllTracksWith(anything())).never();
    verify(mockMediaService.getAllAlbumsWith(anything())).never();
    verify(mockMediaService.getAllArtistsWith(anything())).never();
    verify(mockNewsService.getArticlesWith(anything())).once();
  }));

  test('global search should merge hits from NewService and MediaService', fakeAsync(() => {
    when(mockMediaService.getAllTracksWith(anything())).thenReturn(
      of([new SearchResult(9, 'THE TRACK', '', SearchResultType.Track)])
    );
    when(mockMediaService.getAllAlbumsWith(anything())).thenReturn(
      of([new SearchResult(10, 'THE ALBUM', '', SearchResultType.Album)])
    );
    when(mockMediaService.getAllArtistsWith(anything())).thenReturn(
      of([new SearchResult(11, 'THE ARTIST', '', SearchResultType.Artist)])
    );
    when(mockMediaService.getAllArtistsWith(anything())).thenReturn(
      of([new SearchResult(12, 'THE ARTICLE', '', SearchResultType.Article)])
    );

    service.search('the', 'global').subscribe(res => {
      expect(res.length).toBe(4);
    });
    tick();
  }));

  test('media search should return only hits MediaService', fakeAsync(() => {
    when(mockMediaService.getAllTracksWith(anything())).thenReturn(
      of([new SearchResult(9, 'THE TRACK', '', SearchResultType.Track)])
    );
    when(mockMediaService.getAllAlbumsWith(anything())).thenReturn(
      of([new SearchResult(10, 'THE ALBUM', '', SearchResultType.Album)])
    );
    when(mockMediaService.getAllArtistsWith(anything())).thenReturn(
      of([new SearchResult(11, 'THE ARTIST', '', SearchResultType.Artist)])
    );
    when(mockMediaService.getAllArtistsWith(anything())).thenReturn(
      of([new SearchResult(12, 'THE ARTICLE', '', SearchResultType.Article)])
    );

    service.search('the', 'global').subscribe(res => {
      expect(res.length).toBe(3);
      expect(
        res.findIndex(x => x.searchResultType === SearchResultType.Article)
      ).toBeLessThan(0);
    });
    tick();
  }));
});
