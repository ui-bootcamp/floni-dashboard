import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(UserService);

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
    it('should retrieve data from the localStorage', () => {
      localStorage.setItem(
        'lastDashboardQuery',
        JSON.stringify(Array.of('token'))
      );
      service.getLastQueries();
      expect(service.getLastQueries()).toEqual(['token']);
    });
  });

  describe('saveLastQuery', () => {
    it('should save the first initial query', () => {
      service.saveLastQuery('banana');
      // @ts-ignore
      expect(JSON.parse(localStorage.getItem('lastDashboardQuery'))).toEqual([
        'banana'
      ]);
    });

    it('should save the 3 queries', () => {
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

    it('should save only the last 5 queries', () => {
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
      it('should return true if it is a favorite', () => {
        localStorage.setItem(
          'DashboardFavorites',
          JSON.stringify(Array.of({ type: 1, id: 2 }))
        );
        expect(service.isFavorite(2, 1)).toEqual(true);
      });

      it('should return false if it is not favorite', () => {
        localStorage.setItem(
          'DashboardFavorites',
          JSON.stringify(Array.of({ type: 1, id: 6 }))
        );
        expect(service.isFavorite(2, 1)).toEqual(false);
      });
    });

    describe('toggleFavorite', () => {
      it('should add first value', () => {
        service.toggleFavorite(1, 3);
        // @ts-ignore
        expect(JSON.parse(localStorage.getItem('DashboardFavorites'))).toEqual([
          { type: 3, id: 1 }
        ]);
      });

      it('should append more values', () => {
        service.toggleFavorite(1, 3);
        service.toggleFavorite(3, 3);
        service.toggleFavorite(2, 4);
        // @ts-ignore
        expect(JSON.parse(localStorage.getItem('DashboardFavorites'))).toEqual([
          { type: 3, id: 1 },
          { type: 3, id: 3 },
          { type: 4, id: 2 }
        ]);
      });

      it('should remove an entry if it already exists in the local storage', () => {
        localStorage.setItem(
          'DashboardFavorites',
          JSON.stringify([
            { type: 3, id: 1 },
            { type: 3, id: 2 },
            { type: 3, id: 7 }
          ])
        );
        service.toggleFavorite(2, 3);
        // @ts-ignore
        expect(JSON.parse(localStorage.getItem('DashboardFavorites'))).toEqual([
          { type: 3, id: 1 },
          { type: 3, id: 7 }
        ]);
      });
    });
  });
});
