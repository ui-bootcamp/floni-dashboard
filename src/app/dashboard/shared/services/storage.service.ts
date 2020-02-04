import { Injectable } from '@angular/core';
import { Album } from '../../media/models/album.model';
import { Artist } from '../../media/models/artist.model';
import { Track } from '../../media/models/track.model';
import { Article } from '../../news/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private queryKey = 'lastDashboardQuery';
  private lockKey = 'lockMode';

  public toggleFavorite(element: Artist | Album | Track | Article): void {
    const key: string = this.getStorageKey(element);
    const valuesFromStorage = localStorage.getItem(key);

    if (valuesFromStorage !== null) {
      const favorites = JSON.parse(valuesFromStorage);
      const index = favorites.indexOf(element.id);

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(element.id);
      }
      localStorage.setItem(key, JSON.stringify(favorites));
    } else {
      localStorage.setItem(key, JSON.stringify(Array.of(element.id)));
    }
  }

  public isFavorite(element: Artist | Album | Track | Article): boolean {
    const key: string = this.getStorageKey(element);
    const savedFavorites = localStorage.getItem(key);
    if (savedFavorites !== null) {
      const parsedFavorites = JSON.parse(savedFavorites);
      return parsedFavorites.indexOf(element.id) > -1;
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

  public setLockMode(value: boolean): void {
    localStorage.setItem(this.lockKey, JSON.stringify(value));
  }

  public getLockMode(): boolean {
    const valueFromStorage = localStorage.getItem(this.lockKey);
    if (valueFromStorage) {
      return JSON.parse(valueFromStorage);
    }

    return false;
  }

  private getStorageKey(element: Artist | Album | Track | Article): string {
    if (Artist.isArtist(element)) {
      return 'ArtistFavorites';
    }
    if (Album.isAlbum(element)) {
      return 'AlbumFavorites';
    }
    if (Track.isTrack(element)) {
      return 'TrackFavorites';
    }
    if (Article.isArticle(element)) {
      return 'ArticleFavorites';
    }
    return '';
  }
}
