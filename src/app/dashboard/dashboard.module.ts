import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard.component';
import { SearchResultTypeToIconPipe } from '../shared/pipes/search-result-type-to-icon.pipe';
import { NewsModule } from './news/news.module';

@NgModule({
  declarations: [
    SearchComponent,
    DashboardComponent,
    SearchResultTypeToIconPipe
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    NewsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
