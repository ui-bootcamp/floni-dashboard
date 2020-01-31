import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'db-fake-player',
  templateUrl: './fake-player.component.html',
  styleUrls: ['./fake-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FakePlayerComponent {
  @Input() track: Track | undefined;
  @Input() albumCover = '';
  public playPauseIcon = 'play_arrow';
  public volumeIcon = 'volume_up';

  public onPlayPauseClick(): void {
    this.playPauseIcon =
      this.playPauseIcon === 'pause' ? 'play_arrow' : 'pause';
  }

  public onVolumeClick(): void {
    this.volumeIcon =
      this.volumeIcon === 'volume_up' ? 'volume_off' : 'volume_up';
  }
}
