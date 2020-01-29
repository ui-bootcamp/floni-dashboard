import { Component, Input } from '@angular/core';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'db-fake-player',
  templateUrl: './fake-player.component.html',
  styleUrls: ['./fake-player.component.scss']
})
export class FakePlayerComponent {
  @Input() track: Track | undefined;
  public playPauseIcon = 'play_arrow';
  public volumeIcon = 'volume_up';
  public cover =
    'https://e-cdns-images.dzcdn.net/images/cover/f14becbb0d888cd5457d18d3bb670731/56x56-000000-80-0-0.jpg';

  public onPlayPauseClick(): void {
    this.playPauseIcon =
      this.playPauseIcon === 'pause' ? 'play_arrow' : 'pause';
  }

  public onVolumeClick(): void {
    this.volumeIcon =
      this.volumeIcon === 'volume_up' ? 'volume_off' : 'volume_up';
  }
}
