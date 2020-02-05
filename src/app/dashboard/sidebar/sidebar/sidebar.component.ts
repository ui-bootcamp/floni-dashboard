import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnInit
} from '@angular/core';
import { Track } from '../../media/models/track.model';

@Component({
  selector: 'db-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  // @ts-ignore
  @Input() public track: Track;
  // @ts-ignore
  @Input() public albumCover: string;

  private minOffset = 1;
  private startPositionForDrag = -1;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.albumCover = '';
    this.ngZone.runOutsideAngular(() => {
      const sidebarButtonElement = document.getElementById(
        'dashboardSidebarContainer'
      );
      if (sidebarButtonElement) {
        sidebarButtonElement.addEventListener(
          'pointerdown',
          event => {
            this.startPositionForDrag = event.pageX;
          },
          false
        );
      }

      const dashboardMainElement = document.getElementById('dashboardMain');
      if (dashboardMainElement) {
        dashboardMainElement.addEventListener(
          'pointerup',
          this.onPointerUp.bind(this)
        );

        dashboardMainElement.addEventListener(
          'pointermove',
          this.onPointerMove.bind(this)
        );
      }
    });
  }

  private onPointerUp(event: PointerEvent) {
    const diffX = Math.abs(event.pageX - this.startPositionForDrag);
    const sidebarElement = document.getElementById('dashboardSidebar');

    if (sidebarElement === null) {
      return;
    }
    if (diffX < this.minOffset) {
      sidebarElement.style.width = '0px';
      this.startPositionForDrag = -1;
    } else if (this.startPositionForDrag > 0) {
      sidebarElement.classList.add('sidebar-animation');
      if (screen.width / event.clientX > 2) {
        sidebarElement.style.width = `calc(100% - 50px)`;
      } else {
        sidebarElement.style.width = '550px';
      }
      this.startPositionForDrag = -1;
      setTimeout(() => {
        sidebarElement.classList.remove('sidebar-animation');
      }, 500);
    }
  }

  private onPointerMove(event: PointerEvent) {
    const sidebarElement = document.getElementById('dashboardSidebar');

    if (sidebarElement === null) {
      return;
    }
    if (this.startPositionForDrag > 0) {
      if (event.clientX > 50) {
        sidebarElement.style.width = `calc(100% - ${Math.abs(
          event.clientX
        )}px)`;
      }
    }
  }
}
