import { Component } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'db-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'dashboard';
  public isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }
}
