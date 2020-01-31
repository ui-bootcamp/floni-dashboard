import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultTypeToIconPipe } from './pipes/search-result-type-to-icon.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { SearchComponent } from './search.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SearchComponent, SearchResultTypeToIconPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    CoreModule
  ],
  exports: [SearchComponent]
})
export class SearchModule {}
