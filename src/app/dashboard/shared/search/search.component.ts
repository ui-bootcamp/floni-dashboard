import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './shared/search.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { MediaService } from '../../media/shared/media.service';
import { PlaylistService } from '../services/playlist.service';
import { Track } from '../../media/models/track.model';
import { Artist } from '../../media/models/artist.model';
import { Album } from '../../media/models/album.model';
import { Article } from '../../news/models/article.model';

@Component({
  selector: 'db-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchScope = 'global';
  public readonly searchField: FormControl = new FormControl();
  public searchResults$ = new Observable<
    (Artist | Album | Track | Article)[]
  >();
  public lastUserSearches = '';
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly searchService: SearchService,
    private readonly storageService: StorageService,
    private readonly cd: ChangeDetectorRef,
    private readonly mediaService: MediaService,
    private readonly playlistService: PlaylistService
  ) {}

  public ngOnInit(): void {
    this.searchResults$ = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term.length > 0
          ? this.searchService.search$(term, this.searchScope)
          : of([])
      )
    );

    this.lastUserSearches = this.storageService.getLastQueries().join(' | ');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSearchResultSelected(
    result: Artist | Album | Track | Article
  ): void {
    this.storageService.saveLastQuery(this.searchField.value);
    this.lastUserSearches = this.storageService.getLastQueries().join(' | ');
    this.cd.detectChanges();
    this.searchField.setValue('');
    this.displaySearchResult(result);
  }

  private displaySearchResult(result: Artist | Album | Track | Article): void {
    if (Article.isArticle(result)) {
      const element = document.getElementById('article' + result.id);
      if (element) {
        element.scrollIntoView();
      }
    } else if (Track.isTrack(result)) {
      this.subscriptions.add(
        this.mediaService
          .getTrack$(result.id)
          .subscribe((track: Track) => this.playlistService.queueTrack(track))
      );
    } else if (Album.isAlbum(result)) {
      this.subscriptions.add(
        this.mediaService
          .getAlbum$(result.id)
          .pipe(map(album => album.tracks[0]))
          .subscribe((res: Track) => this.playlistService.queueTrack(res))
      );
    } else if (Artist.isArtist(result)) {
      this.subscriptions.add(
        this.mediaService.getArtist$(result.id).subscribe((artist: Artist) => {
          this.playlistService.queueTrack(artist.albums[0].tracks[0]);
        })
      );
    }
  }
}
