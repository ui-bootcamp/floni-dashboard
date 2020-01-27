import { Component, Input } from '@angular/core';
import { Album } from '../../../shared/models/album.model';

@Component({
  selector: 'db-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  @Input() public album: Album | undefined;
}
