import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'db-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {
  public isFullscreen: boolean;

  constructor(private router: Router) {
    this.isFullscreen = this.router.url.indexOf('/media') !== -1;
  }

  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/media') > -1) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['media']);
    }
  }
}
