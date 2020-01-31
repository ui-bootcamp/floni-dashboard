import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatListOption } from '@angular/material';

import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Track } from '../../models/track.model';
import { SearchResultType } from '../../../shared/search/models/search-result-type.enum';
import { UserService } from '../../../shared/services/user.service';
import { MediaService } from '../../shared/media.service';

@Component({
  selector: 'db-media-selection',
  templateUrl: './media-selection.component.html',
  styleUrls: ['./media-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaSelectionComponent implements OnInit {
  @Output() public selectedTrack$$: Subject<Track>;
  public artists$: Observable<Artist[]>;
  public albums$: Observable<Album[]>;
  public tracks$: Observable<Track[]>;

  constructor(
    private mediaService: MediaService,
    private userService: UserService
  ) {
    this.artists$ = new Observable<Artist[]>();
    this.albums$ = new Observable<Album[]>();
    this.tracks$ = new Observable<Track[]>();
    this.selectedTrack$$ = new Subject<Track>();
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
    this.selectedTrack$$.next(option.value);
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
