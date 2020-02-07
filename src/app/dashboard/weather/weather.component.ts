import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'db-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  public isFullscreen: boolean;

  constructor(private router: Router) {
    this.isFullscreen = this.router.url.indexOf('/weather') !== -1;
  }

  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/weather') > -1) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['weather']);
    }
  }
}
