import { getTestBed, TestBed } from '@angular/core/testing';

import { MediaService } from './media.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('MediaService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: MediaService;
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
    it('returning all artists', done => {
      const dummyArtists = [
        {
          name: 'Deichkind',
          id: 2,
          createdAt: '1900-01-01',
          updatedAt: '1990-01-01'
        },
        {
          name: 'McFitti',
          id: 3,
          createdAt: '1900-01-01',
          updatedAt: '1990-01-01'
        }
      ];

      service.getAllArtists().subscribe(x => {
        expect(x.length).toEqual(2);
        expect(x).toBe(dummyArtists);
        done();
      });

      const req = httpMock.expectOne(`http://localhost:3000/artists/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyArtists);
    });
  });

  describe('#getAlbumsForArtist', () => {
    it('should only returns album for the requested artis>', done => {
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
          updatedAt: 'cover'
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
          updatedAt: 'cover'
        }
      ];

      service.getAlbumsForArtist(2).subscribe(x => {
        expect(x.length).toEqual(1);
        done();
      });

      const req = httpMock.expectOne(`http://localhost:3000/albums/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyAlbums);
    });
    it('should returns nothing, if no entry was found>', done => {
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
          updatedAt: 'cover'
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
          updatedAt: 'cover'
        }
      ];

      service.getAlbumsForArtist(3).subscribe(x => {
        expect(x.length).toEqual(0);
        done();
      });

      const req = httpMock.expectOne(`http://localhost:3000/albums/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyAlbums);
    });
  });

  describe('#getTracksForAlbum ', () => {
    it('returns nothing, if no entry was found', done => {
      const dummyTracks = [
        {
          id: 1,
          albumId: 2,
          artistId: 3,
          title: 'the Title',
          duration: 100,
          createdAt: '1990-01-01',
          updatedAt: '1990-01-01'
        },
        {
          id: 2,
          albumId: 2,
          artistId: 3,
          title: 'the Title2',
          duration: 100,
          createdAt: '1990-01-01',
          updatedAt: '1990-01-01'
        }
      ];

      service.getTracksForAlbum(3).subscribe(x => {
        expect(x.length).toEqual(0);
        done();
      });

      const req = httpMock.expectOne(`http://localhost:3000/tracks/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTracks);
    });

    it('returns only entries for the required album', done => {
      const dummyTracks = [
        {
          id: 1,
          albumId: 2,
          artistId: 3,
          title: 'the Title',
          duration: 100,
          createdAt: '1990-01-01',
          updatedAt: '1990-01-01'
        },
        {
          id: 2,
          albumId: 77,
          artistId: 3,
          title: 'the Title2',
          duration: 100,
          createdAt: '1990-01-01',
          updatedAt: '1990-01-01'
        },
        {
          id: 3,
          albumId: 77,
          artistId: 3,
          title: 'the Title3',
          duration: 100,
          createdAt: '1990-01-01',
          updatedAt: '1990-01-01'
        }
      ];

      service.getTracksForAlbum(77).subscribe(x => {
        expect(x.length).toEqual(2);
        done();
      });

      const req = httpMock.expectOne(`http://localhost:3000/tracks/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTracks);
    });
  });
});
