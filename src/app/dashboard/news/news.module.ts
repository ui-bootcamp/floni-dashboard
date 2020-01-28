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
import { FavoriteDirective } from '../../shared/directives/favorite.directive';
import { FavoriteIconPipe } from '../../shared/pipes/favorite-icon.pipe';

@NgModule({
  declarations: [
    ArticleComponent,
    NewsComponent,
    FavoriteDirective,
    FavoriteIconPipe
  ],
  exports: [NewsComponent, FavoriteDirective, FavoriteIconPipe],
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
