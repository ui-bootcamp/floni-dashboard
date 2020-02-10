import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
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
import { SearchModule } from '../shared/search/search.module';
import { CoreModule } from '../shared/core/core.module';

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
    SearchModule,
    CoreModule
  ]
})
export class NewsModule {}
