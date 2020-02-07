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
import { Album } from '../../models/album.model';

@Component({
  selector: 'db-fake-player-host',
  templateUrl: './fake-player-host.component.html',
  styleUrls: ['./fake-player-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FakePlayerHostComponent implements OnDestroy {
  public track: Track | undefined;
  public albumCover$ = new Observable<string>();
  private subscription: Subscription;

  constructor(
    private readonly mediaService: MediaService,
    private readonly playlistService: PlaylistService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.subscription = this.playlistService.nextTrack$.subscribe(
      (nextTrack: Track) => {
        this.track = nextTrack;
        this.albumCover$ = this.mediaService
          .getAlbum$(nextTrack.albumId)
          .pipe(map((album: Album) => album.coverSmall));
        this.cd.detectChanges();
      }
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
