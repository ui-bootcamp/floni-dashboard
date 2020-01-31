import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaService } from '../../shared/media.service';
import { Track } from '../../models/track.model';
import { PlaylistService } from '../../../shared/services/playlist.service';

@Component({
  selector: 'db-fake-player-host',
  templateUrl: './fake-player-host.component.html',
  styleUrls: ['./fake-player-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FakePlayerHostComponent implements OnDestroy {
  public track: Track | undefined;
  public albumCover: Observable<string>;
  private subscription: Subscription;

  constructor(
    private mediaService: MediaService,
    private playlistService: PlaylistService,
    private cd: ChangeDetectorRef
  ) {
    this.albumCover = new Observable<string>();
    this.subscription = this.playlistService.nextTrack$.subscribe(nextTrack => {
      this.track = nextTrack;
      this.albumCover = this.mediaService
        .getAlbum(nextTrack.albumId)
        .pipe(map(album => album.coverSmall));
      this.cd.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
