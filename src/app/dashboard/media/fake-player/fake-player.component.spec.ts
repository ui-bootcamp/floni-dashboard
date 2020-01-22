import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakePlayerComponent } from './fake-player.component';

describe('FakePlayerComponent', () => {
  let component: FakePlayerComponent;
  let fixture: ComponentFixture<FakePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakePlayerComponent ]
    })
    .compileComponents();
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
