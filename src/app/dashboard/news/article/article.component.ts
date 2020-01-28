import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Article } from '../../../shared/models/article.model';
import { UserService } from '../../../shared/services/user.service';
import { SearchResultType } from '../../../shared/models/search-result-type.enum';

@Component({
  selector: 'db-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  @Input() public article!: Article;
  public type = SearchResultType.Article;
  public isFavorite = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isFavorite = this.userService.isFavorite(this.article.id, this.type);
  }

  public toggleArticleFavorite(id: number): void {
    this.userService.toggleFavorite(id, this.type);
    this.isFavorite = !this.isFavorite;
  }
}
