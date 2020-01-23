import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { NewsService } from '../../shared/services/news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'db-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  public articles$: Observable<Article[]>;

  constructor(private newsService: NewsService) {
    this.articles$ = new Observable<Article[]>();
  }

  public ngOnInit(): void {
    this.articles$ = this.newsService.getArticles();
  }
}
