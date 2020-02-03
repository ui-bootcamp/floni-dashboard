import { Injectable } from '@angular/core';
import { SearchResultType } from '../search/models/search-result-type.enum';
import { Album } from '../../media/models/album.model';
import { Artist } from '../../media/models/artist.model';
import { Track } from '../../media/models/track.model';
import { Article } from '../../news/models/article.model';
import { SearchResult } from '../search/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private queryKey = 'lastDashboardQuery';
  private favoritesKey = 'DashboardFavorites';

  public toggleFavorite(element: Artist | Album | Track | Article): void {
    const valueToToggle = { type: element.type, id: element.id };
    let valuesFromStorage = localStorage.getItem(this.favoritesKey);

    if (valuesFromStorage !== null) {
      const parsedFavorites = JSON.parse(valuesFromStorage);
      if (
        parsedFavorites.findIndex(
          (favorite: { id: number; type: SearchResultType }) =>
            favorite.id === element.id && favorite.type === element.type
        ) > -1
      ) {
        parsedFavorites.splice(
          parsedFavorites.findIndex(
            (favorite: { id: number; type: SearchResultType }) =>
              favorite.id === element.id && favorite.type === element.type
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

  public isFavorite(
    element: Artist | Album | Track | Article | SearchResult
  ): boolean {
    const savedFavorites = localStorage.getItem(this.favoritesKey);
    if (savedFavorites !== null) {
      const parsedFavorites = JSON.parse(savedFavorites);
      return (
        parsedFavorites.findIndex(
          (favorite: { id: number; type: SearchResultType }) =>
            favorite.id === element.id && favorite.type === element.type
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
