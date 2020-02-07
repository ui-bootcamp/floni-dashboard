import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { WeatherService } from '../../shared/weather.service';
import { Subscription } from 'rxjs';
import { WeatherForecast } from '../../models/weather-forecast.model';

@Component({
  selector: 'db-weather-detail-host',
  templateUrl: './weather-detail-host.component.html',
  styleUrls: ['./weather-detail-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailHostComponent implements OnInit, OnDestroy {
  public weatherForecast: WeatherForecast | undefined;
  public errorMessage: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private weatherService: WeatherService,
    private cd: ChangeDetectorRef
  ) {
    this.errorMessage = '';
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public ngOnInit(): void {
    let latitude = 0;
    let longitude = 0;
    const getPosition = new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(pos => {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        resolve();
      });
    });
    getPosition.then(() => {
      this.subscriptions.push(
        this.weatherService
          .getWeatherForLatitudeAndLongitude(latitude, longitude)
          .subscribe(
            (result: WeatherForecast) => {
              this.weatherForecast = result;
              this.errorMessage = '';
              this.cd.detectChanges();
            },
            error => {
              this.errorMessage = error.error.message;
              this.cd.detectChanges();
            }
          )
      );
    });
  }

  public onCitySearch(cityName: string): void {
    this.subscriptions.push(
      this.weatherService.getWeatherForGermanCity(cityName).subscribe(
        (result: WeatherForecast) => {
          this.weatherForecast = result;
          this.errorMessage = '';
          this.cd.detectChanges();
        },
        error => {
          this.errorMessage = error.error.message;
          this.cd.detectChanges();
        }
      )
    );
  }

  public onClearErrorMessage(): void {
    this.errorMessage = '';
  }
}
