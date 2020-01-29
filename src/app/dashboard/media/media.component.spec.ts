import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaComponent } from './media.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import { FakePlayerComponent } from './fake-player/fake-player.component';
import { SecondsToMinutesPipe } from '../../shared/pipes/seconds-to-minutes.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchModule } from '../search/search.module';
import { CoreModule } from '../../shared/core/core.module';
import { MediaSelectionComponent } from './media-selection/media-selection.component';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaComponent,
        MediaSelectionComponent,
        FakePlayerComponent,
        SecondsToMinutesPipe
      ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatProgressBarModule,
        SearchModule,
        CoreModule
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
