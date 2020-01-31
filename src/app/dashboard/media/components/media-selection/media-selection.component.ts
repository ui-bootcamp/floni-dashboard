import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatListOption } from '@angular/material';

import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Track } from '../../models/track.model';

@Component({
  selector: 'db-media-selection',
  templateUrl: './media-selection.component.html',
  styleUrls: ['./media-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaSelectionComponent {
  @Output() public selectedArtistChanged = new EventEmitter<Artist>();
  @Output() public selectedAlbumChanged = new EventEmitter<Album>();
  @Output() public selectedTrackChanged = new EventEmitter<Track>();
  @Output() public favoriteArtistsChanged = new EventEmitter<Artist>();
  @Output() public favoriteAlbumsChanged = new EventEmitter<Album>();
  @Output() public favoriteTracksChanged = new EventEmitter<Track>();
  @Input() public artists: Artist[] = [];
  @Input() public albums: Album[] = [];
  @Input() public tracks: Track[] = [];

  public onSelectedArtistChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.selectedArtistChanged.emit(option.value);
  }

  public onSelectedAlbumChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.selectedAlbumChanged.emit(option.value);
  }

  public onSelectedTrackChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.selectedTrackChanged.emit(option.value);
  }

  public toggleFavoriteArtist(artist: Artist): void {
    artist.isFavorite = !artist.isFavorite;
    this.favoriteArtistsChanged.emit(artist);
  }

  public toggleFavoriteAlbum(album: Album): void {
    album.isFavorite = !album.isFavorite;
    this.favoriteAlbumsChanged.emit(album);
  }

  public toggleFavoriteTrack(track: Track): void {
    track.isFavorite = !track.isFavorite;
    this.favoriteTracksChanged.emit(track);
  }
}
