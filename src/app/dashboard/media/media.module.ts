import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { FakePlayerComponent } from './fake-player/fake-player.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';
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
    MatProgressBarModule,
    MatButtonModule,
    SearchModule,
    CoreModule
  ]
})
export class MediaModule {}
