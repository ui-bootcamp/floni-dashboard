import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from './models/track.model';
import { PlaylistService } from '../shared/services/playlist.service';

@Component({
  selector: 'db-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {
  public isFullscreen: boolean;

  constructor(
    private router: Router,
    private playlistService: PlaylistService
  ) {
    this.isFullscreen = this.router.url.indexOf('/media') !== -1;
  }

  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/media') > -1) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['media']);
    }
  }

  public onSelectedTrackChanged(track: Track): void {
    this.playlistService.queueTrack(track);
  }
}
