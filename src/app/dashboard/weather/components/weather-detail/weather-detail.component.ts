import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { WeatherForecast } from '../../models/weather-forecast.model';

@Component({
  selector: 'db-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailComponent {
  @Input() errorMessage: string;
  @Input() weather: WeatherForecast | undefined;
  @Output() citySearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() clearErrorMessage: EventEmitter<void> = new EventEmitter<void>();

  public cityToSearch: string;

  constructor() {
    this.errorMessage = '';
    this.cityToSearch = '';
  }

  public onKeyDownEnter(): void {
    this.citySearch.emit(this.cityToSearch);
    this.cityToSearch = '';
  }

  public onClickError(): void {
    this.clearErrorMessage.emit();
  }
}
