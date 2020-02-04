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
  @Output() public favoritesChanged = new EventEmitter<
    Artist | Album | Track
  >();
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

  public onLongPress(element: Artist | Album | Track): void {
    element.isFavorite = !element.isFavorite;
    this.favoritesChanged.emit(element);
  }
}
