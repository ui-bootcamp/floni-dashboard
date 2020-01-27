import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakePlayerComponent } from './fake-player.component';
import { MatIconModule, MatProgressBarModule } from '@angular/material';
import { SecondsToMinutesPipe } from '../../../shared/pipes/seconds-to-minutes.pipe';

describe('FakePlayerComponent', () => {
  let component: FakePlayerComponent;
  let fixture: ComponentFixture<FakePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FakePlayerComponent, SecondsToMinutesPipe],
      imports: [MatIconModule, MatProgressBarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
