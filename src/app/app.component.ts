import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from './dashboard/shared/services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'db-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public readonly title = 'dashboard';
  public readonly isDarkTheme$: Observable<boolean>;
  private subscription: Subscription;

  constructor(
    private readonly themeService: ThemeService,
    public readonly overlayContainer: OverlayContainer
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    this.subscription = this.isDarkTheme$.subscribe((value: boolean) => {
      if (value) {
        overlayContainer.getContainerElement().classList.add('dark-theme');
      } else {
        overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
