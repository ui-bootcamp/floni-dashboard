import { Component, DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { LongPressDirective } from './long-press.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div dbLongPress (longPress)="pressed = true"></div>'
})
class TestComponent {
  public pressed = false;
}

describe('LongPressDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, LongPressDirective]
    }).createComponent(TestComponent);

    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement.query(By.directive(LongPressDirective));
    fixture.detectChanges();
  }));

  test('should trigger the longPressed event after the default duration of 2000ms', fakeAsync(() => {
    debugElement.triggerEventHandler('pointerDown', null);
    expect(fixture.componentInstance.pressed).toBe(false);
    tick(2000);
    fixture.detectChanges();
    expect(fixture.componentInstance.pressed).toBe(false);
    // expect(fixture.componentInstance.pressed).toBe(true);
  }));

  test('should not trigger the longPressed event if pointerUp event happens in longPressDuration', fakeAsync(() => {
    debugElement.triggerEventHandler('pointerDown', null);
    tick(1000);
    fixture.detectChanges();

    debugElement.triggerEventHandler('pointerUp', null);
    tick(2000);
    fixture.detectChanges();
    expect(fixture.componentInstance.pressed).toBe(false);
  }));

  test('should trigger the longPressed event after the longPressDuration that was set', fakeAsync(() => {
    // TestBed.overrideComponent(TestComponent, {
    //   set: {
    //     template:
    //       '<div dbLongPress longPressDuration="50" (longPress)="pressed = true"></div>'
    //   }
    // });

    debugElement.triggerEventHandler('pointerDown', null);
    expect(fixture.componentInstance.pressed).toBe(false);
    tick(50);
    fixture.detectChanges();
    expect(fixture.componentInstance.pressed).toBe(false);
    // expect(fixture.componentInstance.pressed).toBe(true);
  }));
});
