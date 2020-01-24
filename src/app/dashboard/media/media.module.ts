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
  MatListModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [
    ArtistComponent,
    FakePlayerComponent,
    AlbumComponent,
    TrackComponent,
    MediaComponent
  ],
  exports: [MediaComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatTableModule
  ]
})
export class MediaModule {}
