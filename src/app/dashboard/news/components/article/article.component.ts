import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'db-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  @Input() public article!: Article;
  @Output() public readonly toggleArticleFavorite = new EventEmitter<Article>();

  public onLongPress(article: Article): void {
    this.toggleArticleFavorite.emit(article);
  }
}
