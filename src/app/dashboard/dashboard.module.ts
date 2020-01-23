import { MatSlideToggleModule } from '@angular/material';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [SearchComponent, DashboardComponent],
  imports: [CommonModule, MatSlideToggleModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}
