import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard.component';
import { SearchResultTypeToIconPipe } from '../shared/pipes/search-result-type-to-icon.pipe';
import { NewsModule } from './news/news.module';
import { MediaModule } from './media/media.module';

@NgModule({
  declarations: [
    SearchComponent,
    DashboardComponent,
    SearchResultTypeToIconPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    NewsModule,
    MediaModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
