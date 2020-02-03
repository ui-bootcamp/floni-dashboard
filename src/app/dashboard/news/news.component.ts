import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Article } from './models/article.model';
import { NewsService } from './shared/news.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'db-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public isFullscreen: boolean;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private userService: StorageService
  ) {
    this.articles$ = new Observable<Article[]>();
    this.isFullscreen = this.router.url.indexOf('/news') !== -1;
  }

  public ngOnInit(): void {
    this.articles$ = this.newsService.getAllArticles();
  }
  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/news') > -1) {
      this.router.navigate(['dashboard']);
      this.isFullscreen = false;
    } else {
      this.router.navigate(['news']);
      this.isFullscreen = true;
    }
  }

  public onToggleArticleFavorite(article: Article): void {
    this.userService.toggleFavorite(article);
    article.isFavorite = !article.isFavorite;
  }
}
