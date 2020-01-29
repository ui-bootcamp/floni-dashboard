import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../shared/services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchResult } from '../../shared/models/search-result.model';
import { UserService } from '../../shared/services/user.service';

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
    private cd: ChangeDetectorRef
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

  public onSearchResultSelected(): void {
    this.userService.saveLastQuery(this.searchField.value);
    this.lastUserSearches = this.userService.getLastQueries().join(' | ');
    this.searchField.setValue('');
    this.cd.detectChanges();
  }
}
