import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaComponent } from './media.component';
import { ArtistComponent } from './artist/artist.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatExpansionModule,
  MatListModule
} from '@angular/material';
import { FakePlayerComponent } from './fake-player/fake-player.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaComponent,
        ArtistComponent,
        AlbumComponent,
        TrackComponent,
        FakePlayerComponent
      ],
      imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatListModule,
        MatExpansionModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
