import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from '../../../shared/models/article.model';
import { UserService } from '../../../shared/services/user.service';
import { SearchResultType } from '../../../shared/models/search-result-type.enum';

@Component({
  selector: 'db-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  @Input() public article!: Article;
  public type = SearchResultType.Article;
  constructor(private userService: UserService) {}

  public toggleArticleFavorite(article: Article): void {
    this.userService.toggleFavorite(article.id, this.type);
    article.isFavorite = !article.isFavorite;
  }
}
