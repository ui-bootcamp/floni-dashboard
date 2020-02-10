import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { Track } from '../../media/models/track.model';

@Component({
  selector: 'db-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements AfterViewInit, OnInit {
  // @ts-ignore
  @Input() public track: Track;
  // @ts-ignore
  @Input() public albumCover: string;
  @ViewChild('dashboardSidebar', { static: false })
  dashboardSidebar!: ElementRef;
  private minOffset = 6;
  private startPositionForDrag = -1;

  constructor(private readonly ngZone: NgZone) {}

  public ngOnInit(): void {
    this.albumCover = '';
  }

  public ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.dashboardSidebar.nativeElement.addEventListener(
        'pointerdown',
        (event: any) => {
          this.startPositionForDrag = event.pageX;
        },
        false
      );

      this.dashboardSidebar.nativeElement.addEventListener(
        'pointerup',
        this.onPointerUp.bind(this)
      );

      this.dashboardSidebar.nativeElement.addEventListener(
        'pointermove',
        this.onPointerMove.bind(this)
      );
    });
  }

  private onPointerUp(event: PointerEvent): void {
    const diffX = Math.abs(event.pageX - this.startPositionForDrag);
    if (diffX < this.minOffset) {
      this.dashboardSidebar.nativeElement.style.width = '0px';
      this.startPositionForDrag = -1;
    } else if (this.startPositionForDrag > 0) {
      this.dashboardSidebar.nativeElement.classList.add('sidebar-animation');
      if (screen.width / event.clientX > 2) {
        this.dashboardSidebar.nativeElement.style.width = `calc(100% - 50px)`;
      } else {
        this.dashboardSidebar.nativeElement.style.width = '550px';
      }
      this.startPositionForDrag = -1;
      setTimeout(() => {
        this.dashboardSidebar.nativeElement.classList.remove(
          'sidebar-animation'
        );
      }, 500);
    }
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.startPositionForDrag > 0) {
      if (event.clientX > 50) {
        this.dashboardSidebar.nativeElement.style.width = `calc(100% - ${Math.abs(
          event.clientX
        )}px)`;
      }
    }
  }
}
