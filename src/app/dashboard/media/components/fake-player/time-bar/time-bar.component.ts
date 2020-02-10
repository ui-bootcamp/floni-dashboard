import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'db-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeBarComponent {
  @Input() public duration = 0;
  public get currentTime(): number {
    return this._currentTime;
  }
  @Input()
  public set currentTime(value: number) {
    this.progress = (value * 100) / this.duration;
    this._currentTime = value;
    this.currentTimeChange.emit(this.currentTime);
  }
  @Output() public currentTimeChange = new EventEmitter<number>();
  @Output() public progressChangeStart = new EventEmitter();
  @Output() public progressChangeEnd = new EventEmitter();
  public progress = 0;
  // tslint:disable-next-line:variable-name
  private _currentTime = 0;

  @ViewChild('timeBar', { static: false }) timeBar!: ElementRef;
  @ViewChild('progressBar', { static: false }) progressBar!: ElementRef;
  @ViewChild('handle', { static: false }) handle!: ElementRef;

  constructor(private ngZone: NgZone) {}

  public onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    this.ngZone.runOutsideAngular(() => {
      this.timeBar.nativeElement.addEventListener(
        'pointermove',
        this.onPointerMove
      );
    });
    this.progressChangeStart.emit();
  }

  public onPointerUp(event: PointerEvent): void {
    event.preventDefault();
    this.timeBar.nativeElement.removeEventListener(
      'pointermove',
      this.onPointerMove
    );

    const offset = event.pageX - this.timeBar.nativeElement.offsetLeft;
    const newTime = Math.ceil(
      (offset * this.duration) / this.timeBar.nativeElement.clientWidth
    );
    if (newTime >= 0 && newTime <= this.duration) {
      this.currentTime = newTime;
    }
    this.progressChangeEnd.emit();
  }

  private onPointerMove = (event: PointerEvent) => {
    event.preventDefault();
    const offset = event.pageX - this.timeBar.nativeElement.offsetLeft;
    const timeBarWidth = this.timeBar.nativeElement.offsetWidth;
    const handleWidth = this.handle.nativeElement.offsetWidth;

    if (offset < timeBarWidth - handleWidth - event.width) {
      this.progressBar.nativeElement.style.width = `${offset}px`;
    }
  };
}
