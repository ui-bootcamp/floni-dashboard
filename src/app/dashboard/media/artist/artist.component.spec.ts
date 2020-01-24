import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import { MatExpansionModule } from '@angular/material';
import { AlbumComponent } from '../album/album.component';
import { TrackComponent } from '../track/track.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistComponent, AlbumComponent, TrackComponent],
      imports: [MatExpansionModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
