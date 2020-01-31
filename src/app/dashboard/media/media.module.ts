import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakePlayerComponent } from './components/fake-player/fake-player.component';
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
import { SecondsToMinutesPipe } from './components/fake-player/pipes/seconds-to-minutes.pipe';
import { SearchModule } from '../shared/search/search.module';
import { CoreModule } from '../shared/core/core.module';
import { MediaSelectionComponent } from './components/media-selection/media-selection.component';
import { FormsModule } from '@angular/forms';
import { FakePlayerHostComponent } from './components/fake-player-host/fake-player-host.component';

@NgModule({
  declarations: [
    FakePlayerComponent,
    FakePlayerHostComponent,
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
    CoreModule,
    FormsModule
  ]
})
export class MediaModule {}
