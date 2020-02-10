import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'db-fake-player',
  templateUrl: './fake-player.component.html',
  styleUrls: ['./fake-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FakePlayerComponent {
  @Input() albumCover = '';
  public playPauseIcon = 'play_arrow';
  public volumeIcon = 'volume_up';
  public currentTime = 0;
  // tslint:disable-next-line:variable-name
  private _track!: Track;

  public get track(): Track {
    return this._track;
  }

  @Input()
  public set track(value: Track) {
    this._track = value;
    this.currentTime = 0;
    this.playPauseIcon = 'pause';
  }

  public onPlayPauseClick(): void {
    this.playPauseIcon =
      this.playPauseIcon === 'pause' ? 'play_arrow' : 'pause';
  }

  public onVolumeClick(): void {
    this.volumeIcon =
      this.volumeIcon === 'volume_up' ? 'volume_off' : 'volume_up';
  }

  public onProgressChangeStart(): void {
    this.playPauseIcon = 'play_arrow';
  }

  public onProgressChangeEnd(): void {
    this.playPauseIcon = 'pause';
  }
}
