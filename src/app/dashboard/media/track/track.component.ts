import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'db-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input() public track: Track | undefined;

  constructor() {}

  ngOnInit() {}
}
