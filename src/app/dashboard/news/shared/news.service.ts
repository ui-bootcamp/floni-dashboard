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
  private URL = `${environment.baseUrl}news`;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  public getAllArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.URL).pipe(
      map(articles => {
        return articles.map(article => {
          article.isFavorite = this.storageService.isFavorite(article);
          return article;
        });
      })
    );
  }

  public getArticlesWhichContain(searchString: string): Observable<Article[]> {
    return this.getAllArticles().pipe(
      map(articles =>
        articles.filter(
          x =>
            x.title.toUpperCase().includes(searchString.toUpperCase()) ||
            x.description.toUpperCase().includes(searchString.toUpperCase())
        )
      )
    );
  }
}
