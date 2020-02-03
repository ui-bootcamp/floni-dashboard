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

  const dummyArtists = [
    new Artist(2, 'Deichkind', '1900-01-01', '1990-01-01'),

    new Artist(3, 'McFitti', '1900-01-01', '1990-01-01')
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
      'cover'
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
      'cover'
    )
  ];
  const dummyTracks = [
    new Track(1, 2, 3, 'the Title', 100, '1990-01-01', '1990-01-01'),
    new Track(2, 77, 3, 'the Title2', 100, '1990-01-01', '1990-01-01'),
    new Track(3, 77, 3, 'the Title3', 100, '1990-01-01', '1990-01-01')
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

  describe('getAllAlbums', () => {
    test('should return all albums', fakeAsync(() => {
      service.getAllAlbums().subscribe(x => {
        expect(x).toEqual(dummyAlbums);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}albums/`);
      req.flush(dummyAlbums);
      tick();
    }));
  });

  describe('getAllTracks', () => {
    test('should return all tracks', fakeAsync(() => {
      service.getAllTracks().subscribe(x => {
        expect(x).toEqual(dummyTracks);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}tracks/`);
      req.flush(dummyTracks);
      tick();
    }));
  });
});
