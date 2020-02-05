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
          'mousedown',
          event => {
            this.startPositionForDrag = event.pageX;
          },
          false
        );

        sidebarButtonElement.addEventListener(
          'touchstart',
          e => {
            this.startPositionForDrag = e.touches[0].clientX;
          },
          false
        );
      }

      const dashboardMainElement = document.getElementById('dashboardMain');
      if (dashboardMainElement) {
        dashboardMainElement.addEventListener(
          'mouseup',
          this.mouseHandler.bind(this)
        );

        dashboardMainElement.addEventListener(
          'mousemove',
          this.mouseHandler.bind(this)
        );

        dashboardMainElement.addEventListener(
          'touchmove',
          this.touchHandler.bind(this)
        );
        dashboardMainElement.addEventListener(
          'touchend',
          this.touchHandler.bind(this)
        );
      }
    });
  }

  private touchHandler(event: TouchEvent) {
    const diffX = Math.abs(
      event.changedTouches[0].clientX - this.startPositionForDrag
    );
    event.preventDefault();
    event.stopImmediatePropagation();

    const sidebarElement = document.getElementById('dashboardSidebar');

    if (sidebarElement === null) {
      return;
    }

    if (diffX < this.minOffset) {
      sidebarElement.style.width = '0px';
      this.startPositionForDrag = -1;
    } else if (this.startPositionForDrag > 0 && event.type === 'touchend') {
      sidebarElement.classList.add('sidebar-animation');
      if (screen.width / event.changedTouches[0].clientX > 2) {
        sidebarElement.style.width = `calc(100% - 50px)`;
      } else {
        sidebarElement.style.width = '550px';
      }
      this.startPositionForDrag = -1;
      setTimeout(() => {
        sidebarElement.classList.remove('sidebar-animation');
      }, 500);
    } else if (this.startPositionForDrag > 0 && event.type === 'touchmove') {
      if (event.changedTouches[0].clientX > 50) {
        sidebarElement.style.width = `calc(100% - ${Math.abs(
          event.changedTouches[0].clientX
        )}px)`;
      }
    }
  }

  private mouseHandler(event: MouseEvent) {
    const diffX = Math.abs(event.pageX - this.startPositionForDrag);
    const sidebarElement = document.getElementById('dashboardSidebar');

    if (sidebarElement === null) {
      return;
    }

    if (diffX < this.minOffset && event.type === 'mouseup') {
      sidebarElement.style.width = '0px';
      this.startPositionForDrag = -1;
    } else if (this.startPositionForDrag > 0 && event.type === 'mouseup') {
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
    } else if (this.startPositionForDrag > 0 && event.type === 'mousemove') {
      if (event.clientX > 50) {
        sidebarElement.style.width = `calc(100% - ${Math.abs(
          event.clientX
        )}px)`;
      }
    }
  }
}
