import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';

import { MediaService } from './media.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('MediaService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: MediaService;
  const dummyTracks = [
    {
      id: 1,
      albumId: 2,
      artistId: 3,
      title: 'the Title',
      duration: 100,
      createdAt: '1990-01-01',
      updatedAt: '1990-01-01',
      isFavorite: false
    },
    {
      id: 2,
      albumId: 77,
      artistId: 3,
      title: 'the Title2',
      duration: 100,
      createdAt: '1990-01-01',
      updatedAt: '1990-01-01',
      isFavorite: false
    },
    {
      id: 3,
      albumId: 77,
      artistId: 3,
      title: 'the Title3',
      duration: 100,
      createdAt: '1990-01-01',
      updatedAt: '1990-01-01',
      isFavorite: false
    }
  ];
  const dummyArtists = [
    {
      name: 'Deichkind',
      id: 2,
      createdAt: '1900-01-01',
      updatedAt: '1990-01-01',
      isFavorite: false
    },
    {
      name: 'McFitti',
      id: 3,
      createdAt: '1900-01-01',
      updatedAt: '1990-01-01',
      isFavorite: false
    }
  ];
  const dummyAlbums = [
    {
      id: 1,
      artistId: 1,
      name: 'Album1',
      cover: 'cover',
      coverSmall: 'cover',
      coverMedium: 'cover',
      coverBig: 'cover',
      coverXL: 'cover',
      createdAt: 'cover',
      updatedAt: 'cover',
      isFavorite: false
    },
    {
      id: 2,
      artistId: 2,
      name: 'Album2',
      cover: 'cover',
      coverSmall: 'cover',
      coverMedium: 'cover',
      coverBig: 'cover',
      coverXL: 'cover',
      createdAt: 'cover',
      updatedAt: 'cover',
      isFavorite: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MediaService]
    });
    injector = getTestBed();
    service = injector.get(MediaService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('getAllArtists', () => {
    test('should return all artists', fakeAsync(() => {
      service.getAllArtists().subscribe(x => {
        expect(x).toEqual(dummyArtists);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}artists/`);
      req.flush(dummyArtists);
      tick();
    }));
  });

  describe('getAlbumsForArtist', () => {
    test('should only returns album for the requested artist>', fakeAsync(() => {
      service.getAlbumsForArtist(2).subscribe(x => {
        expect(x.length).toEqual(1);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}albums/`);
      req.flush(dummyAlbums);
      tick();
    }));

    test('should return nothing, if no entry was found>', fakeAsync(() => {
      service.getAlbumsForArtist(3).subscribe(x => {
        expect(x.length).toEqual(0);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}albums/`);
      req.flush(dummyAlbums);
      tick();
    }));
  });

  describe('getTracksForAlbum ', () => {
    test('should return nothing, if no entry was found', fakeAsync(() => {
      service.getTracksForAlbum(3).subscribe(x => {
        expect(x.length).toEqual(0);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}tracks/`);
      req.flush(dummyTracks);
      tick();
    }));

    test('should return only entries for the required album', fakeAsync(() => {
      service.getTracksForAlbum(77).subscribe(x => {
        expect(x.length).toEqual(2);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}tracks/`);
      req.flush(dummyTracks);
      tick();
    }));
  });
});
