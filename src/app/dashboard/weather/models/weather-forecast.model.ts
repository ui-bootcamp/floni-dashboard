import { Weather } from './weather.model';

export class WeatherForecast {
  constructor(
    public cityName: string,
    public coordinatesAsString: string,
    public weatherInformation: Weather[]
  ) {}
}
