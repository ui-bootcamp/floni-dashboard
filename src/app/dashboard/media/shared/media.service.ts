import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { map } from 'rxjs/operators';
import { Track } from '../models/track.model';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private artistsURL = `${environment.baseUrl}artists/`;
  private albumsURL = `${environment.baseUrl}albums/`;
  private tracksURL = `${environment.baseUrl}tracks/`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public getArtist(id: number): Observable<Artist> {
    const artistURL = `${this.artistsURL}${id}`;
    return this.http.get<Artist>(artistURL).pipe(
      map(artist => {
        artist.isFavorite = this.storageService.isFavorite(artist);
        artist.albums.forEach(
          album => (album.isFavorite = this.storageService.isFavorite(album))
        );
        return artist;
      })
    );
  }

  public getAlbum(id: number): Observable<Album> {
    const albumURL = `${this.albumsURL}${id}`;
    return this.http.get<Album>(albumURL).pipe(
      map(album => {
        album.isFavorite = this.storageService.isFavorite(album);
        album.tracks.forEach(
          track => (track.isFavorite = this.storageService.isFavorite(track))
        );
        return album;
      })
    );
  }

  public getTrack(id: number): Observable<Track> {
    const tracksURL = `${this.tracksURL}${id}`;
    return this.http.get<Track[]>(tracksURL).pipe(
      map(tracks => tracks[0]),
      map(track => {
        track.isFavorite = this.storageService.isFavorite(track);
        return track;
      })
    );
  }

  public getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistsURL).pipe(
      map(artists => {
        return artists.map(artist => {
          artist.isFavorite = this.storageService.isFavorite(artist);
          return artist;
        });
      })
    );
  }

  public getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsURL).pipe(
      map(albums => {
        return albums.map(album => {
          album.isFavorite = this.storageService.isFavorite(album);
          return album;
        });
      })
    );
  }

  public getAllTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(this.tracksURL).pipe(
      map(tracks => {
        return tracks.map(track => {
          track.isFavorite = this.storageService.isFavorite(track);
          return track;
        });
      })
    );
  }

  public getAllArtistsWhichContain(artistName: string): Observable<Artist[]> {
    return this.getAllArtists().pipe(
      map(artists =>
        artists.filter(x =>
          x.name.toUpperCase().includes(artistName.toUpperCase())
        )
      )
    );
  }

  public getAllAlbumsWhichContain(albumName: string): Observable<Album[]> {
    return this.getAllAlbums().pipe(
      map(albums =>
        albums.filter(album =>
          album.name.toUpperCase().includes(albumName.toUpperCase())
        )
      )
    );
  }

  public getAllTracksWhichContain(trackName: string): Observable<Track[]> {
    return this.getAllTracks().pipe(
      map(tracks =>
        tracks.filter(x =>
          x.title.toUpperCase().includes(trackName.toUpperCase())
        )
      )
    );
  }
}
