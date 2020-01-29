import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private nextTrack$$ = new Subject<Track>();
  public nextTrack$ = this.nextTrack$$.asObservable();

  constructor() {}

  public queueTrack(track: Track): void {
    this.nextTrack$$.next(track);
  }
}
