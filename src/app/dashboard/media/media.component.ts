import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../shared/models/artist.model';
import { MediaService } from '../../shared/services/media.service';
import { MatListOption } from '@angular/material';
import { Album } from '../../shared/models/album.model';
import { Track } from '../../shared/models/track.model';
import { Router } from '@angular/router';

@Component({
  selector: 'db-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  public artists$: Observable<Artist[]>;
  public albums$: Observable<Album[]>;
  public tracks$: Observable<Track[]>;
  public currentTrack: Track | undefined;
  public isFullscreen: boolean;

  constructor(private mediaService: MediaService, private router: Router) {
    this.artists$ = new Observable<Artist[]>();
    this.albums$ = new Observable<Album[]>();
    this.tracks$ = new Observable<Track[]>();
    this.isFullscreen = this.router.url.indexOf('/media') !== -1;
  }

  public ngOnInit(): void {
    this.artists$ = this.mediaService.getAllArtists();
  }

  public onSelectedArtistChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.albums$ = this.mediaService.getAlbumsForArtist(option.value.id);
  }

  public onSelectedAlbumChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.tracks$ = this.mediaService.getTracksForAlbum(option.value.id);
  }

  public onSelectedTrackChanged(option: MatListOption): void {
    option.selectionList.deselectAll();
    option.selected = true;
    this.currentTrack = option.value;
  }

  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/media') > -1) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['media']);
    }
  }
}
