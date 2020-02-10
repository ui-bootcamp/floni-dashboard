import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';
import { LockService } from '../../services/lock.service';
import { StorageService } from '../../services/storage.service';

@Directive({
  selector: '[dbLock]'
})
export class LockDirective implements AfterContentChecked {
  constructor(
    private readonly el: ElementRef,
    private readonly lockService: LockService,
    private readonly renderer: Renderer2,
    private readonly storageService: StorageService
  ) {
    this.lockService.isLockActive$.subscribe((value: boolean) => {
      this.storageService.setLockMode(value);
      this.handleLocking(value);
    });
  }

  public ngAfterContentChecked(): void {
    this.handleLocking(this.storageService.getLockMode());
  }

  private handleLocking(value: boolean) {
    if (value) {
      if (this.el.nativeElement.tagName === 'IMG') {
        this.renderer.addClass(this.el.nativeElement, 'lock-hide');
      }
      this.renderer.addClass(this.el.nativeElement, 'lock');
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'lock');
      this.renderer.removeClass(this.el.nativeElement, 'lock-hide');
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }
}
