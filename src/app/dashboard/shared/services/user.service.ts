import { Injectable } from '@angular/core';
import { SearchResultType } from '../search/models/search-result-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private queryKey = 'lastDashboardQuery';
  private favoritesKey = 'DashboardFavorites';

  constructor() {}

  public toggleFavorite(favId: number, favType: SearchResultType): void {
    const valueToToggle = { type: favType, id: favId };
    let valuesFromStorage = localStorage.getItem(this.favoritesKey);

    if (valuesFromStorage !== null) {
      const parsedFavorites = JSON.parse(valuesFromStorage);
      if (
        parsedFavorites.findIndex(
          (favorite: { id: number; type: SearchResultType }) =>
            favorite.id === favId && favorite.type === favType
        ) > -1
      ) {
        parsedFavorites.splice(
          parsedFavorites.findIndex(
            (favorite: { id: number; type: SearchResultType }) =>
              favorite.id === favId && favorite.type === favType
          ),
          1
        );
      } else {
        parsedFavorites.push(valueToToggle);
      }
      valuesFromStorage = parsedFavorites;
      localStorage.setItem(
        this.favoritesKey,
        JSON.stringify(valuesFromStorage)
      );
    } else {
      localStorage.setItem(
        this.favoritesKey,
        JSON.stringify(Array.of(valueToToggle))
      );
    }
  }

  public isFavorite(favId: number, favType: SearchResultType): boolean {
    const savedFavorites = localStorage.getItem(this.favoritesKey);
    if (savedFavorites !== null) {
      const parsedFavorites = JSON.parse(savedFavorites);
      return (
        parsedFavorites.findIndex(
          (favorite: { id: number; type: SearchResultType }) =>
            favorite.id === favId && favorite.type === favType
        ) > -1
      );
    } else {
      return false;
    }
  }

  public saveLastQuery(term: string): void {
    const valueFromStorage = localStorage.getItem(this.queryKey);
    let valueToSave = Array.of(term);

    if (valueFromStorage !== null) {
      const storedArray = JSON.parse(valueFromStorage);
      // we only store last 5 queries
      if (storedArray.length > 4) {
        storedArray.shift();
      }
      storedArray.push(term);
      valueToSave = storedArray;
    }

    localStorage.setItem(this.queryKey, JSON.stringify(valueToSave));
  }

  public getLastQueries(): string[] {
    const valueFromStorage = localStorage.getItem(this.queryKey);
    if (valueFromStorage !== null) {
      return JSON.parse(valueFromStorage);
    } else {
      return [];
    }
  }
}
