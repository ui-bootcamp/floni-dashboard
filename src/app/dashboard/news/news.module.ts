import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { NewsComponent } from './news.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatListModule, MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [ArticleComponent, NewsComponent],
  exports: [NewsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatMenuModule,
    MatListModule
  ]
})
export class NewsModule {}
