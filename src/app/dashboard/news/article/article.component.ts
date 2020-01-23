import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from '../../../shared/models/article.model';

@Component({
  selector: 'db-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  @Input() public article: Article | undefined;
}
