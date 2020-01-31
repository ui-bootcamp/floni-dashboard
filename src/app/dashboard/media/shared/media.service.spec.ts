import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';

import { MediaService } from './media.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Track } from '../models/track.model';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

describe('MediaService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: MediaService;
  const dummyTracks = [
    new Track(1, 2, 3, 'the Title', 100, '1990-01-01', '1990-01-01', false),
    new Track(2, 77, 3, 'the Title2', 100, '1990-01-01', '1990-01-01', false),
    new Track(3, 77, 3, 'the Title3', 100, '1990-01-01', '1990-01-01', false)
  ];
  const dummyArtists = [
    new Artist(2, 'Deichkind', '1900-01-01', '1990-01-01', false),

    new Artist(3, 'McFitti', '1900-01-01', '1990-01-01', false)
  ];
  const dummyAlbums = [
    new Album(
      1,
      1,
      'Album1',
      'cover',
      'cover',
      'cover',
      'cover',
      'cover',
      'cover',
      'cover',
      false
    ),

    new Album(
      2,
      2,
      'Album2',
      'cover',
      'cover',
      'cover',
      'cover',
      'cover',
      'cover',
      'cover',
      false
    )
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
      service.getAlbumsOfArtist(2).subscribe(x => {
        expect(x.length).toEqual(1);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}albums/`);
      req.flush(dummyAlbums);
      tick();
    }));

    test('should return nothing, if no entry was found>', fakeAsync(() => {
      service.getAlbumsOfArtist(3).subscribe(x => {
        expect(x.length).toEqual(0);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}albums/`);
      req.flush(dummyAlbums);
      tick();
    }));
  });

  describe('getTracksForAlbum ', () => {
    test('should return nothing, if no entry was found', fakeAsync(() => {
      service.getTracksInAlbum(3).subscribe(x => {
        expect(x.length).toEqual(0);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}tracks/`);
      req.flush(dummyTracks);
      tick();
    }));

    test('should return only entries for the required album', fakeAsync(() => {
      service.getTracksInAlbum(77).subscribe(x => {
        expect(x.length).toEqual(2);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}tracks/`);
      req.flush(dummyTracks);
      tick();
    }));
  });
});
