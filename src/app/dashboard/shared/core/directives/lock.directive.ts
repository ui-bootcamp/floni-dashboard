import {
  AfterContentChecked,
  Directive,
  ElementRef,
  HostBinding,
  Renderer2
} from '@angular/core';
import { LockService } from '../../services/lock.service';
import { StorageService } from '../../services/storage.service';

@Directive({
  selector: '[dbLock]'
})
export class LockDirective implements AfterContentChecked {
  // @ts-ignore
  @HostBinding('attr.disabled') private isLocked = false;

  constructor(
    private el: ElementRef,
    private lockService: LockService,
    private renderer: Renderer2,
    private storageService: StorageService
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
      this.isLocked = true;
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'lock');
      this.renderer.removeClass(this.el.nativeElement, 'lock-hide');
      this.isLocked = false;
    }
  }
}
