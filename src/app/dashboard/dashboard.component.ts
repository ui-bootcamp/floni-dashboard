import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './shared/services/theme.service';
import 'hammerjs';
import { LockService } from './shared/services/lock.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'db-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public isDarkTheme$: Observable<boolean>;
  public isLockActive: boolean;

  constructor(
    private themeService: ThemeService,
    private lockService: LockService,
    private storageService: StorageService
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    this.isLockActive = false;
  }

  public ngOnInit(): void {
    this.isLockActive = this.storageService.getLockMode();
  }

  public toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  public toggleLock(checked: boolean): void {
    this.lockService.setLockSate(checked);
  }
}
