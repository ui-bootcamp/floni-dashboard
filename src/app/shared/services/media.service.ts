import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { map, switchMap } from 'rxjs/operators';
import { Track } from '../models/track.model';
import { SearchResult } from '../models/search-result.model';
import { SearchResultType } from '../models/search-result-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private artistsURL = 'http://localhost:3000/artists/';
  private albumsURL = 'http://localhost:3000/albums/';
  private tracksURL = 'http://localhost:3000/tracks/';

  constructor(private http: HttpClient) {}

  public getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistsURL);
  }

  public getAllArtistsWith(artistName: string): Observable<SearchResult[]> {
    return this.http.get<Artist[]>(this.artistsURL).pipe(
      map(artists =>
        artists.filter(x =>
          x.name.toUpperCase().includes(artistName.toUpperCase())
        )
      ),
      map(v =>
        v.map(x => new SearchResult(x.id, x.name, '', SearchResultType.Artist))
      )
    );
  }

  public getArtist(id: number): Observable<Artist> {
    const artistURL = `${this.artistsURL}${id}`;
    return this.http.get<Artist>(artistURL);
  }

  public getAlbum(id: number): Observable<Album> {
    const albumURL = `${this.albumsURL}${id}`;
    return this.http.get<Album>(albumURL);
  }

  public getAllAlbumsWith(albumName: string): Observable<SearchResult[]> {
    return this.http.get<Album[]>(this.albumsURL).pipe(
      map(albums =>
        albums.filter(x =>
          x.name.toUpperCase().includes(albumName.toUpperCase())
        )
      ),
      map(v => {
        return v.map(
          x =>
            new SearchResult(
              x.id,
              x.name,
              x.artistId.toString(),
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
          if (
            artists.find(x => x.id.toString() === result.additionalInformation)
          ) {
            // @ts-ignore
            result.additionalInformation = artists.find(
              x => x.id.toString() === result.additionalInformation
            ).name;
          }
          return result;
        });
      })
    );
  }

  public getAlbumsForArtist(artistId: number): Observable<Album[]> {
    return this.http
      .get<Album[]>(this.albumsURL)
      .pipe(
        map(resultArray => resultArray.filter(x => x.artistId === artistId))
      );
  }

  public getTracksForAlbum(albumId: number): Observable<Track[]> {
    return this.http
      .get<Track[]>(this.tracksURL)
      .pipe(map(resultArray => resultArray.filter(x => x.albumId === albumId)));
  }

  public getAllTracksWith(trackName: string): Observable<SearchResult[]> {
    return this.http.get<Track[]>(this.tracksURL).pipe(
      map(tracks =>
        tracks.filter(x =>
          x.title.toUpperCase().includes(trackName.toUpperCase())
        )
      ),
      map(v =>
        v.map(
          x =>
            new SearchResult(
              x.id,
              x.title,
              x.albumId.toString(),
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
          if (
            albums.find(x => x.id.toString() === result.additionalInformation)
          ) {
            // @ts-ignore
            result.additionalInformation = albums.find(
              x => x.id.toString() === result.additionalInformation
            ).name;
          }
          return result;
        });
      })
    );
  }
}
