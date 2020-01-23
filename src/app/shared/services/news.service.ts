import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.URL}news`);
  }
}
