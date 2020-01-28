import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultTypeToIconPipe } from '../../shared/pipes/search-result-type-to-icon.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent, SearchResultTypeToIconPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [SearchComponent]
})
export class SearchModule {}
