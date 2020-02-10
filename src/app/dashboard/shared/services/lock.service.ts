import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LockService {
  private lockActive$$: Subject<boolean> = new Subject<boolean>();
  public isLockActive$: Observable<boolean> = this.lockActive$$;

  public setLockSate(newBlockValue: boolean): void {
    this.lockActive$$.next(newBlockValue);
  }
}
