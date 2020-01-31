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
import { SearchResult } from './models/search-result.model';
import { StorageService } from '../services/storage.service';
import { SearchResultType } from './models/search-result-type.enum';
import { MediaService } from '../../media/shared/media.service';
import { PlaylistService } from '../services/playlist.service';
import { Track } from '../../media/models/track.model';

@Component({
  selector: 'db-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchScope = 'global';
  public searchField: FormControl = new FormControl();
  public searchResults$: Observable<SearchResult[]>;
  public lastUserSearches: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private searchService: SearchService,
    private userService: StorageService,
    private cd: ChangeDetectorRef,
    private mediaService: MediaService,
    private playlistService: PlaylistService
  ) {
    this.searchResults$ = new Observable<SearchResult[]>();
    this.lastUserSearches = '';
  }

  public ngOnInit(): void {
    this.searchResults$ = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term.length > 0
          ? this.searchService.search(term, this.searchScope)
          : of([])
      )
    );

    this.lastUserSearches = this.userService.getLastQueries().join(' | ');
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onSearchResultSelected(result: SearchResult): void {
    this.userService.saveLastQuery(this.searchField.value);
    this.lastUserSearches = this.userService.getLastQueries().join(' | ');
    this.cd.detectChanges();
    this.searchField.setValue('');
    this.displaySearchResult(result);
  }

  private displaySearchResult(result: SearchResult) {
    switch (result.type) {
      case SearchResultType.Article:
        const element = document.getElementById('article' + result.type);
        if (element) {
          element.scrollIntoView();
        }
        break;
      case SearchResultType.Track:
        this.subscriptions.push(
          this.mediaService.getTrack(result.id).subscribe((track: Track) => {
            this.playlistService.queueTrack(track);
          })
        );
        break;
      case SearchResultType.Album:
        this.subscriptions.push(
          this.mediaService
            .getAlbum(result.id)
            .pipe(map(album => album.tracks[0]))
            .subscribe((res: Track) => {
              this.playlistService.queueTrack(res);
            })
        );
        break;
      case SearchResultType.Artist:
        this.subscriptions.push(
          this.mediaService
            .getFirstTrackFromArtist(result.id)
            .subscribe((res: Track[]) => {
              this.playlistService.queueTrack(res[0]);
            })
        );
        break;
    }
  }
}