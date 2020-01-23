import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { map } from 'rxjs/operators';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public getAllArtists(): Observable<Artist[]> {
    const artistsURL = `${this.mediaURL}artists`;
    return this.http.get<Artist[]>(artistsURL);
  }

  public getArtist(id: number): Observable<Artist> {
    const artistURL = `${this.mediaURL}artists/${id}`;
    return this.http.get<Artist>(artistURL);
  }

  public getAlbum(id: number): Observable<Album> {
    const albumURL = `${this.mediaURL}albums/${id}`;
    return this.http.get<Album>(albumURL);
  }

  public getAlbumsForArtist(artistId: number): Observable<Album[]> {
    const albumURL = `${this.mediaURL}albums`;
    return this.http
      .get<Album[]>(albumURL)
      .pipe(
        map(resultArray => resultArray.filter(x => x.artistId === artistId))
      );
  }

  public getTracksForAlbum(albumId: number): Observable<Track[]> {
    const albumURL = `${this.mediaURL}tracks`;
    return this.http
      .get<Track[]>(albumURL)
      .pipe(map(resultArray => resultArray.filter(x => x.albumId === albumId)));
  }
}
