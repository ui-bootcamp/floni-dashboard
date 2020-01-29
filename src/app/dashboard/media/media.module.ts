import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakePlayerComponent } from './fake-player/fake-player.component';
import { MediaComponent } from './media.component';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { SecondsToMinutesPipe } from '../../shared/pipes/seconds-to-minutes.pipe';
import { SearchModule } from '../search/search.module';
import { CoreModule } from '../../shared/core/core.module';
import { MediaSelectionComponent } from './media-selection/media-selection.component';

@NgModule({
  declarations: [
    FakePlayerComponent,
    MediaComponent,
    SecondsToMinutesPipe,
    MediaSelectionComponent
  ],
  exports: [MediaComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    SearchModule,
    CoreModule
  ]
})
export class MediaModule {}
