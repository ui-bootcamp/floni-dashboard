import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../../../shared/models/artist.model';
import { Observable } from 'rxjs';
import { Album } from '../../../shared/models/album.model';
import { MediaService } from '../../../shared/services/media.service';

@Component({
  selector: 'db-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  @Input() public artist: Artist | undefined;
  public albums$: Observable<Album[]>;

  constructor(private mediaService: MediaService) {
    this.albums$ = new Observable<Album[]>();
  }

  ngOnInit() {
    if (this.artist) {
      this.albums$ = this.mediaService.getAlbumsForArtist(this.artist.id);
    }
  }
}
