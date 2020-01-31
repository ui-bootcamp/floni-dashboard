import {
  MatIconModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { NewsModule } from './news/news.module';
import { MediaModule } from './media/media.module';
import { SearchModule } from './shared/search/search.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NewsModule,
    MediaModule,
    SearchModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
