import { Component } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'db-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'dashboard';
  public isDarkTheme$: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    overlayContainer: OverlayContainer
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    this.isDarkTheme$.subscribe((value: boolean) => {
      if (value) {
        overlayContainer.getContainerElement().classList.add('dark-theme');
      } else {
        overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
  }
}
