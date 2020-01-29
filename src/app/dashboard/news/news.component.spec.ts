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
import { CoreModule } from '../../shared/core/core.module';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent, ArticleComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        MatCardModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        SearchModule,
        CoreModule
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
