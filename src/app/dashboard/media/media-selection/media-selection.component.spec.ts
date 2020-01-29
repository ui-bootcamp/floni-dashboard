import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSelectionComponent } from './media-selection.component';
import {
  MatIconModule,
  MatListModule,
  MatProgressBarModule
} from '@angular/material';
import { CoreModule } from '../../../shared/core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MediaSelectionComponent', () => {
  let component: MediaSelectionComponent;
  let fixture: ComponentFixture<MediaSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaSelectionComponent],
      imports: [
        HttpClientTestingModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        CoreModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
