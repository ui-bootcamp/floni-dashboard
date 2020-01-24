import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../shared/models/artist.model';
import { MediaService } from '../../shared/services/media.service';

@Component({
  selector: 'db-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  public artists$: Observable<Artist[]>;

  constructor(private mediaService: MediaService) {
    this.artists$ = new Observable<Artist[]>();
  }

  public ngOnInit(): void {
    this.artists$ = this.mediaService.getAllArtists();
  }
}
