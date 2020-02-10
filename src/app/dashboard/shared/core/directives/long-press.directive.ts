import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[dbLongPress]'
})
export class LongPressDirective {
  @Input() longPressDuration = 2000;
  @Output() longPress: EventEmitter<Event> = new EventEmitter();
  private timeout: any;

  @HostListener('pointerdown', ['$event'])
  public onPointerDown(event: Event): void {
    this.timeout = setTimeout(() => {
      this.longPress.emit(event);
    }, this.longPressDuration);
  }

  @HostListener('pointerup')
  public onPointerUp(): void {
    clearTimeout(this.timeout);
  }
}
