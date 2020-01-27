import { Component, Input } from '@angular/core';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'db-fake-player',
  templateUrl: './fake-player.component.html',
  styleUrls: ['./fake-player.component.scss']
})
export class FakePlayerComponent {
  @Input() track: Track | undefined;
}
