import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme$$: Subject<boolean> = new Subject<boolean>();
  public isDarkTheme$: Observable<boolean> = this.darkTheme$$;

  public setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme$$.next(isDarkTheme);
  }
}
