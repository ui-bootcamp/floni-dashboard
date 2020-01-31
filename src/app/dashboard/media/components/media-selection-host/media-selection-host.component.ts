import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';
import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { MediaService } from '../../shared/media.service';
import { StorageService } from '../../../shared/services/storage.service';
import { SearchResultType } from '../../../shared/search/models/search-result-type.enum';
import { PlaylistService } from '../../../shared/services/playlist.service';

@Component({
  selector: 'db-media-selection-host',
  templateUrl: './media-selection-host.component.html',
  styleUrls: ['./media-selection-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaSelectionHostComponent implements OnInit {
  public artists$ = new Observable<Artist[]>();
  public albums$ = new Observable<Album[]>();
  public tracks$ = new Observable<Track[]>();

  constructor(
    private mediaService: MediaService,
    private storageService: StorageService,
    private playlistService: PlaylistService
  ) {}

  public ngOnInit(): void {
    this.artists$ = this.mediaService.getAllArtists();
  }

  public onSelectedArtistChanged(artist: Artist): void {
    this.albums$ = this.mediaService.getAlbumsOfArtist(artist.id);
  }

  public onSelectedAlbumChanged(album: Album): void {
    this.tracks$ = this.mediaService.getTracksInAlbum(album.id);
  }

  public onSelectedTrackChanged(track: Track): void {
    this.playlistService.queueTrack(track);
  }

  public onFavoriteArtistsChanged(artist: Artist): void {
    this.storageService.toggleFavorite(artist.id, SearchResultType.Artist);
  }

  public onFavoriteAlbumsChanged(album: Album): void {
    this.storageService.toggleFavorite(album.id, SearchResultType.Album);
  }

  public onFavoriteTracksChanged(track: Track): void {
    this.storageService.toggleFavorite(track.id, SearchResultType.Track);
  }
}
