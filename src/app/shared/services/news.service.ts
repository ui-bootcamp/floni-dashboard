import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { SearchResult } from '../models/search-result.model';
import { map } from 'rxjs/operators';
import { SearchResultType } from '../models/search-result-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL = 'http://localhost:3000/news';

  constructor(private httpClient: HttpClient) {}

  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.URL);
  }

  public getArticlesWith(searchString: string): Observable<SearchResult[]> {
    return this.httpClient.get<Article[]>(this.URL).pipe(
      map(articles =>
        articles.filter(
          x =>
            x.title.toUpperCase().includes(searchString.toUpperCase()) ||
            x.description.toUpperCase().includes(searchString.toUpperCase())
        )
      ),
      map(articles =>
        articles.map(
          article =>
            new SearchResult(
              article.id,
              article.title,
              article.description,
              SearchResultType.Article
            )
        )
      )
    );
  }
}
