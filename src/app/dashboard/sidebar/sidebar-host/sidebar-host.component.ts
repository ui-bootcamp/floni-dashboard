import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { PlaylistService } from '../../shared/services/playlist.service';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../../media/models/track.model';
import { map } from 'rxjs/operators';
import { MediaService } from '../../media/shared/media.service';

@Component({
  selector: 'db-sidebar-host',
  templateUrl: './sidebar-host.component.html',
  styleUrls: ['./sidebar-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarHostComponent implements OnDestroy {
  // @ts-ignore
  public currentTrack: Track;
  public albumCover$: Observable<string>;
  public subscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private mediaService: MediaService,
    private cd: ChangeDetectorRef
  ) {
    this.albumCover$ = new Observable<string>();
    this.subscription = this.playlistService.nextTrack$.subscribe(nextTrack => {
      this.currentTrack = nextTrack;
      this.albumCover$ = this.mediaService
        .getAlbum(nextTrack.albumId)
        .pipe(map(album => album.coverBig));
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
