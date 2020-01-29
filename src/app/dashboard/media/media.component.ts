import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from '../../shared/models/track.model';
import { Observable } from 'rxjs';
import { PlaylistService } from '../../shared/services/playlist.service';

@Component({
  selector: 'db-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {
  public isFullscreen: boolean;
  public selectedTrack$: Observable<Track> | undefined;

  constructor(
    private router: Router,
    private playlistService: PlaylistService
  ) {
    this.isFullscreen = this.router.url.indexOf('/media') !== -1;
    this.selectedTrack$ = this.playlistService.nextTrack$;
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
