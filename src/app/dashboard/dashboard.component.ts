import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './shared/services/theme.service';
import 'hammerjs';

@Component({
  selector: 'db-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  public toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }
}
