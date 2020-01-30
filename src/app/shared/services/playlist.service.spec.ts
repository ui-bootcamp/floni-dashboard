import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { Track } from '../models/track.model';

describe('PlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('queue next track should work', done => {
    const service: PlaylistService = TestBed.get(PlaylistService);
    service.nextTrack$.subscribe((value: Track) => {
      expect(value.title).toEqual('gangnam-style');
      done();
    });
    service.queueTrack({
      id: 1,
      title: 'gangnam-style',
      artistId: 2,
      albumId: 3,
      createdAt: '',
      duration: 4120,
      isFavorite: false,
      updatedAt: ''
    });
  });
});
