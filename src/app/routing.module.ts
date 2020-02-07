import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './dashboard/media/media.component';
import { NewsComponent } from './dashboard/news/news.component';
import { WeatherComponent } from './dashboard/weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'media', component: MediaComponent },
  { path: 'news', component: NewsComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule {}
