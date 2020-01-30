import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../shared/services/search.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchResult } from '../../shared/models/search-result.model';
import { UserService } from '../../shared/services/user.service';
import { SearchResultType } from '../../shared/models/search-result-type.enum';
import { MediaService } from '../../shared/services/media.service';
import { PlaylistService } from '../../shared/services/playlist.service';
import { Track } from '../../shared/models/track.model';

@Component({
  selector: 'db-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input() searchScope = 'global';
  public searchField: FormControl = new FormControl();
  public searchResults$: Observable<SearchResult[]>;
  public lastUserSearches: string;

  constructor(
    private searchService: SearchService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private mediaService: MediaService,
    private playlistService: PlaylistService
  ) {
    this.searchResults$ = new Observable<SearchResult[]>();
    this.lastUserSearches = '';
  }

  ngOnInit() {
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

  public onSearchResultSelected(result: SearchResult): void {
    this.userService.saveLastQuery(this.searchField.value);
    this.lastUserSearches = this.userService.getLastQueries().join(' | ');
    this.cd.detectChanges();
    this.searchField.setValue('');
    this.displaySearchResult(result);
  }

  private displaySearchResult(result: SearchResult) {
    switch (result.searchResultType) {
      case SearchResultType.Article:
        const element = document.getElementById('article' + result.identifier);
        if (element) {
          element.scrollIntoView();
        }
        break;
      case SearchResultType.Track:
        this.mediaService
          .getTrack(result.identifier)
          .subscribe((track: Track) => {
            this.playlistService.queueTrack(track);
          });
        break;
      case SearchResultType.Album:
        this.mediaService
          .getAlbum(result.identifier)
          .pipe(map(album => album.tracks[0]))
          .subscribe((res: Track) => {
            this.playlistService.queueTrack(res);
          });
        break;
      case SearchResultType.Artist:
        this.mediaService
          .getAnyTrackFromArtist(result.identifier)
          .subscribe((res: Track[]) => {
            this.playlistService.queueTrack(res[0]);
          });
        break;
    }
  }
}
