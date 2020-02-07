import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDetailHostComponent } from './components/weather-detail-host/weather-detail-host.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { WeatherComponent } from './weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../shared/core/core.module';

@NgModule({
  declarations: [
    WeatherDetailHostComponent,
    WeatherDetailComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [WeatherComponent]
})
export class WeatherModule {}
