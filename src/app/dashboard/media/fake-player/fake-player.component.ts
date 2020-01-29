import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { Track } from '../../../shared/models/track.model';
import { Observable } from 'rxjs';
import { MediaService } from '../../../shared/services/media.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'db-fake-player',
  templateUrl: './fake-player.component.html',
  styleUrls: ['./fake-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FakePlayerComponent implements OnChanges {
  @Input() track: Track | undefined;
  public playPauseIcon = 'play_arrow';
  public volumeIcon = 'volume_up';
  public albumCover: Observable<string>;

  constructor(private mediaService: MediaService) {
    this.albumCover = new Observable<string>();
  }

  public ngOnChanges(): void {
    if (this.track) {
      this.albumCover = this.mediaService
        .getAlbum(this.track.albumId)
        .pipe(map(album => album.coverSmall));
    }
  }

  public onPlayPauseClick(): void {
    this.playPauseIcon =
      this.playPauseIcon === 'pause' ? 'play_arrow' : 'pause';
  }

  public onVolumeClick(): void {
    this.volumeIcon =
      this.volumeIcon === 'volume_up' ? 'volume_off' : 'volume_up';
  }
}
