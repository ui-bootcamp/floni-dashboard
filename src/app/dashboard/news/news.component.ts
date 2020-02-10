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
  public articles$ = new Observable<Article[]>();
  public isFullscreen = this.router.url.indexOf('/news') !== -1;

  constructor(
    private readonly newsService: NewsService,
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  public ngOnInit(): void {
    this.articles$ = this.newsService.getAllArticles$();
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
    this.storageService.toggleFavorite(article);
    article.isFavorite = !article.isFavorite;
  }
}
