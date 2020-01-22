import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { FakePlayerComponent } from './fake-player/fake-player.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';



@NgModule({
  declarations: [ArtistComponent, FakePlayerComponent, AlbumComponent, TrackComponent],
  imports: [
    CommonModule
  ]
})
export class MediaModule { }
