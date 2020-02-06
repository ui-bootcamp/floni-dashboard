import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { SearchModule } from '../shared/search/search.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    MatIconModule,
    MatToolbarModule,
    SearchModule,
    MatButtonModule
  ]
})
export class MapModule {}
