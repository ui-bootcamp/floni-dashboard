import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../../../shared/models/album.model';
import { MediaService } from '../../../shared/services/media.service';
import { Observable } from 'rxjs';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'db-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() public album: Album | undefined;
  public tracks$: Observable<Track[]>;

  constructor(private mediaService: MediaService) {
    this.tracks$ = new Observable<Track[]>();
  }

  ngOnInit() {
    if (this.album) {
      this.tracks$ = this.mediaService.getTracksForAlbum(this.album.id);
    }
  }
}
