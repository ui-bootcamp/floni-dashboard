import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { NewsComponent } from './news.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [ArticleComponent, NewsComponent],
  exports: [NewsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    SearchModule
  ]
})
export class NewsModule {}
