import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private static readonly URL = `${environment.baseUrl}news`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService
  ) {}

  public getAllArticles$(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(NewsService.URL).pipe(
      map((articles: Article[]) => {
        return articles.map((article: Article) => {
          article.isFavorite = this.storageService.isFavorite(article);
          return article;
        });
      })
    );
  }

  public getArticlesWhichContain$(searchString: string): Observable<Article[]> {
    return this.getAllArticles$().pipe(
      map((articles: Article[]) =>
        articles.filter(
          (article: Article) =>
            article.title.toUpperCase().includes(searchString.toUpperCase()) ||
            article.description
              .toUpperCase()
              .includes(searchString.toUpperCase())
        )
      )
    );
  }
}
