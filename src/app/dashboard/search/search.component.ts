import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../shared/services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchResult } from '../../shared/models/search-result.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'db-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchField: FormControl = new FormControl();
  public searchResults$: Observable<SearchResult[]>;

  constructor(private searchService: SearchService) {
    this.searchResults$ = new Observable<SearchResult[]>();
  }

  ngOnInit() {
    this.searchResults$ = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term.length > 0 ? this.searchService.search(term) : of([])
      )
    );
  }
}
