import { Component, Input } from '@angular/core';
import { Artist } from '../../../shared/models/artist.model';

@Component({
  selector: 'db-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
  @Input() public artist: Artist | undefined;
}
