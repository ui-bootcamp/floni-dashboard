import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Artist } from '../../media/models/artist.model';

describe('StorageService', () => {
  let service: StorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(StorageService);

    let store: any = {};
    const mockLocalStorage: any = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  describe('getLastQueries', () => {
    test('should retrieve data from the localStorage', () => {
      localStorage.setItem(
        'lastDashboardQuery',
        JSON.stringify(Array.of('token'))
      );
      service.getLastQueries();
      expect(service.getLastQueries()).toEqual(['token']);
    });
  });

  describe('saveLastQuery', () => {
    test('should save the given string to the local storage', () => {
      service.saveLastQuery('banana');
      // @ts-ignore
      expect(JSON.parse(localStorage.getItem('lastDashboardQuery'))).toEqual([
        'banana'
      ]);
    });

    test('should extend the local storage if called multiple times', () => {
      service.saveLastQuery('banana');
      service.saveLastQuery('red');
      service.saveLastQuery('carpet');
      // @ts-ignore
      expect(JSON.parse(localStorage.getItem('lastDashboardQuery'))).toEqual([
        'banana',
        'red',
        'carpet'
      ]);
    });

    test('should save only the last 5 queries', () => {
      service.saveLastQuery('banana');
      service.saveLastQuery('red');
      service.saveLastQuery('carpet');
      service.saveLastQuery('apple');
      service.saveLastQuery('trump');
      service.saveLastQuery('golden');
      // @ts-ignore
      expect(JSON.parse(localStorage.getItem('lastDashboardQuery'))).toEqual([
        'red',
        'carpet',
        'apple',
        'trump',
        'golden'
      ]);
    });

    describe('isFavorite', () => {
      let artist: Artist;
      beforeEach(() => {
        artist = new Artist(1, 'artist1', 'now', 'never');
        localStorage.setItem(
          'ArtistFavorites',
          JSON.stringify(Array.of(artist.id))
        );
      });

      test('should return true if id exist in the local storage', () => {
        expect(service.isFavorite(artist)).toEqual(true);
      });

      test('should return false if id does not exist in the local storage', () => {
        const otherArtist = new Artist(3, 'otherArtist', 'now', 'never');
        expect(service.isFavorite(otherArtist)).toEqual(false);
      });
    });

    describe('onLongPress', () => {
      let artist1: Artist;
      let artist2: Artist;
      let artist3: Artist;
      beforeEach(() => {
        artist1 = new Artist(1, 'artist1', 'now', 'never');
        artist2 = new Artist(2, 'artist2', 'now', 'never');
        artist3 = new Artist(3, 'artist3', 'now', 'never');
      });
      test('should store the given parameters to the local storage', () => {
        service.toggleFavorite(artist1);
        // @ts-ignore
        expect(JSON.parse(localStorage.getItem('ArtistFavorites'))).toEqual([
          artist1.id
        ]);
      });

      test('should append the values in the local storage if it is called multiple times', () => {
        service.toggleFavorite(artist1);
        service.toggleFavorite(artist2);
        service.toggleFavorite(artist3);
        // @ts-ignore
        expect(JSON.parse(localStorage.getItem('ArtistFavorites'))).toEqual([
          artist1.id,
          artist2.id,
          artist3.id
        ]);
      });

      test('should remove an entry from the local storage if it already exists', () => {
        localStorage.setItem(
          'ArtistFavorites',
          JSON.stringify([artist1.id, artist2.id, artist3.id])
        );
        service.toggleFavorite(artist2);
        // @ts-ignore
        expect(JSON.parse(localStorage.getItem('ArtistFavorites'))).toEqual([
          artist1.id,
          artist3.id
        ]);
      });
    });
  });
});
