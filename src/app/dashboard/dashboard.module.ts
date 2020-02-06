import {
  MatIconModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { NewsModule } from './news/news.module';
import { MediaModule } from './media/media.module';
import { SearchModule } from './shared/search/search.module';
import { CoreModule } from './shared/core/core.module';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { SidebarHostComponent } from './sidebar/sidebar-host/sidebar-host.component';
import { WeatherModule } from './weather/weather.module';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, SidebarHostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NewsModule,
    MediaModule,
    WeatherModule,
    MapModule,
    SearchModule,
    MatSelectModule,
    CoreModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
