import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultToIconPipe } from './pipes/result-to-icon.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { SearchComponent } from './search.component';
import { CoreModule } from '../core/core.module';
import { IdToArtistPipe } from './pipes/id-to-artist.pipe';

@NgModule({
  declarations: [SearchComponent, ResultToIconPipe, IdToArtistPipe],
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
