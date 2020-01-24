import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { NewsComponent } from './news.component';
import {
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  declarations: [ArticleComponent, NewsComponent],
  exports: [NewsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule
  ]
})
export class NewsModule {}
