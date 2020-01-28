import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import { ArticleComponent } from './article/article.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchModule } from '../search/search.module';
import { FavoriteDirective } from '../../shared/directives/favorite.directive';
import { FavoriteIconPipe } from '../../shared/pipes/favorite-icon.pipe';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsComponent,
        ArticleComponent,
        FavoriteDirective,
        FavoriteIconPipe
      ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        MatCardModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        SearchModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
