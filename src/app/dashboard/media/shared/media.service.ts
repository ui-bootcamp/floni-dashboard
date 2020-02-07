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
  private static readonly ARTIST_URL = `${environment.baseUrl}artists/`;
  private static readonly ALBUMS_URL = `${environment.baseUrl}albums/`;
  private static readonly TRACKS_URL = `${environment.baseUrl}tracks/`;

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {}

  public getArtist$(id: number): Observable<Artist> {
    const artistURL = `${MediaService.ARTIST_URL}${id}`;
    return this.http.get<Artist>(artistURL).pipe(
      map((artist: Artist) => {
        artist.isFavorite = this.storageService.isFavorite(artist);
        artist.albums.forEach(
          (album: Album) =>
            (album.isFavorite = this.storageService.isFavorite(album))
        );
        return artist;
      })
    );
  }

  public getAlbum$(id: number): Observable<Album> {
    const albumURL = `${MediaService.ALBUMS_URL}${id}`;
    return this.http.get<Album>(albumURL).pipe(
      map((album: Album) => {
        album.isFavorite = this.storageService.isFavorite(album);
        album.tracks.forEach(
          (track: Track) =>
            (track.isFavorite = this.storageService.isFavorite(track))
        );
        return album;
      })
    );
  }

  public getTrack$(id: number): Observable<Track> {
    const tracksURL = `${MediaService.TRACKS_URL}${id}`;
    return this.http.get<Track[]>(tracksURL).pipe(
      map((tracks: Track[]) => tracks[0]),
      map((track: Track) => {
        track.isFavorite = this.storageService.isFavorite(track);
        return track;
      })
    );
  }

  public getAllArtists$(): Observable<Artist[]> {
    return this.http.get<Artist[]>(MediaService.ARTIST_URL).pipe(
      map((artists: Artist[]) => {
        return artists.map((artist: Artist) => {
          artist.isFavorite = this.storageService.isFavorite(artist);
          return artist;
        });
      })
    );
  }

  public getAllAlbums$(): Observable<Album[]> {
    return this.http.get<Album[]>(MediaService.ALBUMS_URL).pipe(
      map((albums: Album[]) => {
        return albums.map(album => {
          album.isFavorite = this.storageService.isFavorite(album);
          return album;
        });
      })
    );
  }

  public getAllTracks$(): Observable<Track[]> {
    return this.http.get<Track[]>(MediaService.TRACKS_URL).pipe(
      map((tracks: Track[]) => {
        return tracks.map((track: Track) => {
          track.isFavorite = this.storageService.isFavorite(track);
          return track;
        });
      })
    );
  }

  public getAllArtistsWhichContain$(artistName: string): Observable<Artist[]> {
    return this.getAllArtists$().pipe(
      map((artists: Artist[]) =>
        artists.filter(x =>
          x.name.toUpperCase().includes(artistName.toUpperCase())
        )
      )
    );
  }

  public getAllAlbumsWhichContain$(albumName: string): Observable<Album[]> {
    return this.getAllAlbums$().pipe(
      map((albums: Album[]) =>
        albums.filter(album =>
          album.name.toUpperCase().includes(albumName.toUpperCase())
        )
      )
    );
  }

  public getAllTracksWhichContain$(trackName: string): Observable<Track[]> {
    return this.getAllTracks$().pipe(
      map((tracks: Track[]) =>
        tracks.filter(x =>
          x.title.toUpperCase().includes(trackName.toUpperCase())
        )
      )
    );
  }
}
