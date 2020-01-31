import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Article } from '../../models/article.model';
import { SearchResultType } from '../../../shared/search/models/search-result-type.enum';

@Component({
  selector: 'db-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  @Input() public article!: Article;
  @Output() public readonly toggleArticleFavorite = new EventEmitter<Article>();
  public type = SearchResultType.Article;

  constructor() {}

  public dblClickArticle(article: Article): void {
    this.toggleArticleFavorite.emit(article);
  }
}
