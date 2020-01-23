import { MatSlideToggleModule } from '@angular/material';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard.component';
import { NewsModule } from './news/news.module';

@NgModule({
  declarations: [SearchComponent, DashboardComponent],
  imports: [CommonModule, MatSlideToggleModule, NewsModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}
