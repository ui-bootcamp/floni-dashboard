import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { FakePlayerComponent } from './fake-player/fake-player.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';
import { MediaComponent } from './media.component';
import {
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

@NgModule({
  declarations: [
    ArtistComponent,
    FakePlayerComponent,
    AlbumComponent,
    TrackComponent,
    MediaComponent,
    SecondsToMinutesPipe
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
    MatProgressBarModule
  ]
})
export class MediaModule {}
