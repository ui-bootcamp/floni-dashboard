import { PlaylistService } from './playlist.service';
import { Track } from '../models/track.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('PlaylistService', () => {
  let playlistService: PlaylistService;
  let dummyTrack: Track;

  beforeEach(() => {
    playlistService = new PlaylistService();
    dummyTrack = {
      id: 1,
      title: 'gangnam-style',
      artistId: 2,
      albumId: 3,
      createdAt: '',
      duration: 4120,
      isFavorite: false,
      updatedAt: ''
    };
  });

  test('queue next track should work', fakeAsync(() => {
    playlistService.nextTrack$.subscribe((value: Track) => {
      expect(value.title).toEqual('gangnam-style');
    });
    playlistService.queueTrack(dummyTrack);

    tick();
  }));
});
