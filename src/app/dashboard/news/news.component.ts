import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { NewsService } from '../../shared/services/news.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'db-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public isFullscreen: boolean;

  constructor(private newsService: NewsService, private router: Router) {
    this.articles$ = new Observable<Article[]>();
    this.isFullscreen = this.router.url.indexOf('/news') !== -1;
  }

  public ngOnInit(): void {
    this.articles$ = this.newsService.getArticles();
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
}
