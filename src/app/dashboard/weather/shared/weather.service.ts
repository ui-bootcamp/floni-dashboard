import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherForecast } from '../models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private static readonly WEATHER_URL =
    'http://api.openweathermap.org/data/2.5/forecast?';
  private static readonly API_KEY_UNIT =
    '&APPID=871403311831b90480a82ab10f71d6a9&units=metric';

  constructor(private httpClient: HttpClient) {}

  public getWeatherForLatitudeAndLongitude$(
    latitude: number,
    longitude: number
  ): Observable<WeatherForecast> {
    return this.httpClient
      .get(
        `${WeatherService.WEATHER_URL}lat=${latitude}&lon=${longitude}${WeatherService.API_KEY_UNIT}`
      )
      .pipe(this.mapForecastObjects());
  }

  public getWeatherForGermanCity$(
    cityName: string
  ): Observable<WeatherForecast> {
    return this.httpClient
      .get(
        `${WeatherService.WEATHER_URL}q=${cityName},DE${WeatherService.API_KEY_UNIT}`
      )
      .pipe(this.mapForecastObjects());
  }

  private mapForecastObjects() {
    return map((forecastObject: any) => {
      const currentMonth = ('0' + (new Date().getMonth() + 1)).slice(-2);
      const tomorrow = ('0' + (new Date().getDate() + 1)).slice(-2);
      const dayAfterTomorrow = ('0' + (new Date().getDate() + 2)).slice(-2);

      const stringForTomorrow = `${new Date().getFullYear()}-${currentMonth}-${tomorrow} 12:00:00`;
      const stringForDayAfterTomorrow = `${new Date().getFullYear()}-${currentMonth}-${dayAfterTomorrow} 12:00:00`;

      const forecastObjectTomorrow = forecastObject.list.find(
        (forecastItem: any) => forecastItem.dt_txt === stringForTomorrow
      );
      const forecastObjectDayAfterTomorrow = forecastObject.list.find(
        (forecastItem: any) => forecastItem.dt_txt === stringForDayAfterTomorrow
      );

      return new WeatherForecast(
        forecastObject.city.name,
        `(${forecastObject.city.coord.lat}, ${forecastObject.city.coord.lon})`,
        Array.of(
          new Weather(
            new Date(forecastObject.list[0].dt * 1000),
            forecastObject.list[0].weather[0].description,
            forecastObject.list[0].main.temp,
            forecastObject.list[0].weather[0].icon
          ),
          new Weather(
            new Date(forecastObjectTomorrow.dt * 1000),
            forecastObjectTomorrow.weather[0].description,
            forecastObjectTomorrow.main.temp,
            forecastObjectTomorrow.weather[0].icon
          ),
          new Weather(
            new Date(forecastObjectDayAfterTomorrow.dt * 1000),
            forecastObjectDayAfterTomorrow.weather[0].description,
            forecastObjectDayAfterTomorrow.main.temp,
            forecastObjectDayAfterTomorrow.weather[0].icon
          )
        )
      );
    });
  }
}
