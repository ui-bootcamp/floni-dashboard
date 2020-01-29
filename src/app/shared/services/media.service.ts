import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { map, switchMap } from 'rxjs/operators';
import { Track } from '../models/track.model';
import { SearchResult } from '../models/search-result.model';
import { SearchResultType } from '../models/search-result-type.enum';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { AlbumWithTracks } from '../models/album-with-tracks.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private artistsURL = `${environment.baseUrl}artists/`;
  private albumsURL = `${environment.baseUrl}albums/`;
  private tracksURL = `${environment.baseUrl}tracks/`;

  constructor(private http: HttpClient, private userService: UserService) {}

  public getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistsURL).pipe(
      map(artists => {
        return artists.map(artist => {
          artist.isFavorite = this.userService.isFavorite(
            artist.id,
            SearchResultType.Artist
          );
          return artist;
        });
      })
    );
  }

  public getAllArtistsWith(artistName: string): Observable<SearchResult[]> {
    return this.http.get<Artist[]>(this.artistsURL).pipe(
      map(artists =>
        artists.filter(x =>
          x.name.toUpperCase().includes(artistName.toUpperCase())
        )
      ),
      map(artists =>
        artists.map(
          artist =>
            new SearchResult(
              artist.id,
              artist.name,
              '',
              SearchResultType.Artist
            )
        )
      )
    );
  }

  public getArtist(id: number): Observable<Artist> {
    const artistURL = `${this.artistsURL}${id}`;
    return this.http.get<Artist>(artistURL);
  }

  public getAlbum(id: number): Observable<AlbumWithTracks> {
    const albumURL = `${this.albumsURL}${id}`;
    return this.http.get<AlbumWithTracks>(albumURL);
  }

  public getTrack(id: number): Observable<Track[]> {
    const tracksURL = `${this.tracksURL}${id}`;
    return this.http.get<Track[]>(tracksURL);
  }

  public getAnyTrackfromArtist(id: number): Observable<Track[]> {
    return this.http
      .get<Track[]>(this.tracksURL)
      .pipe(map(tracks => tracks.filter(x => x.artistId === id)));
  }

  public getAllAlbumsWith(albumName: string): Observable<SearchResult[]> {
    return this.http.get<Album[]>(this.albumsURL).pipe(
      map(albums =>
        albums.filter(album =>
          album.name.toUpperCase().includes(albumName.toUpperCase())
        )
      ),
      map(albums => {
        return albums.map(
          album =>
            new SearchResult(
              album.id,
              album.name,
              album.artistId.toString(),
              SearchResultType.Album
            )
        );
      }),
      switchMap(results => {
        return combineLatest(
          of(results),
          this.http.get<Artist[]>(this.artistsURL)
        );
      }),
      map(([results, artists]) => {
        return results.map(result => {
          const foundArtist = artists.find(
            artist => artist.id.toString() === result.additionalInformation
          );
          if (foundArtist !== undefined) {
            result.additionalInformation = foundArtist.name;
          }
          return result;
        });
      })
    );
  }

  public getAlbumsForArtist(artistId: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsURL).pipe(
      map(resultArray => resultArray.filter(x => x.artistId === artistId)),
      map(albums => {
        return albums.map(album => {
          album.isFavorite = this.userService.isFavorite(
            album.id,
            SearchResultType.Album
          );
          return album;
        });
      })
    );
  }

  public getTracksForAlbum(albumId: number): Observable<Track[]> {
    return this.http.get<Track[]>(this.tracksURL).pipe(
      map(resultArray => resultArray.filter(x => x.albumId === albumId)),
      map(tracks => {
        return tracks.map(track => {
          track.isFavorite = this.userService.isFavorite(
            track.id,
            SearchResultType.Track
          );
          return track;
        });
      })
    );
  }

  public getAllTracksWith(trackName: string): Observable<SearchResult[]> {
    return this.http.get<Track[]>(this.tracksURL).pipe(
      map(tracks =>
        tracks.filter(x =>
          x.title.toUpperCase().includes(trackName.toUpperCase())
        )
      ),
      map(tracks =>
        tracks.map(
          track =>
            new SearchResult(
              track.id,
              track.title,
              track.albumId.toString(),
              SearchResultType.Track
            )
        )
      ),
      switchMap(results => {
        return combineLatest(
          of(results),
          this.http.get<Album[]>(this.albumsURL)
        );
      }),
      map(([results, albums]) => {
        return results.map(result => {
          const foundAlbum = albums.find(
            x => x.id.toString() === result.additionalInformation
          );
          if (foundAlbum !== undefined) {
            result.additionalInformation = foundAlbum.name;
          }
          return result;
        });
      })
    );
  }
}
