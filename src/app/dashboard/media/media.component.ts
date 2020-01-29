import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../shared/models/artist.model';
import { MediaService } from '../../shared/services/media.service';
import { MatListOption } from '@angular/material';
import { Album } from '../../shared/models/album.model';
import { Track } from '../../shared/models/track.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { SearchResultType } from '../../shared/models/search-result-type.enum';

@Component({
  selector: 'db-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent implements OnInit {
  public artists$: Observable<Artist[]>;
  public albums$: Observable<Album[]>;
  public tracks$: Observable<Track[]>;
  public currentTrack: Track | undefined;
  public isFullscreen: boolean;

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private userService: UserService
  ) {
    this.artists$ = new Observable<Artist[]>();
    this.albums$ = new Observable<Album[]>();
    this.tracks$ = new Observable<Track[]>();
    this.isFullscreen = this.router.url.indexOf('/media') !== -1;
  }

  public ngOnInit(): void {
    this.artists$ = this.mediaService.getAllArtists();
  }

  public onSelectedArtistChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.albums$ = this.mediaService.getAlbumsForArtist(option.value.id);
  }

  public onSelectedAlbumChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.tracks$ = this.mediaService.getTracksForAlbum(option.value.id);
  }

  public onSelectedTrackChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.currentTrack = option.value;
  }

  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/media') > -1) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['media']);
    }
  }

  public toggleFavoriteArtist(artist: Artist): void {
    this.userService.toggleFavorite(artist.id, SearchResultType.Artist);
    artist.isFavorite = !artist.isFavorite;
  }

  public toggleFavoriteAlbum(album: Album): void {
    this.userService.toggleFavorite(album.id, SearchResultType.Album);
    album.isFavorite = !album.isFavorite;
  }

  public toggleFavoriteTrack(track: Track): void {
    this.userService.toggleFavorite(track.id, SearchResultType.Track);
    track.isFavorite = !track.isFavorite;
  }
}
