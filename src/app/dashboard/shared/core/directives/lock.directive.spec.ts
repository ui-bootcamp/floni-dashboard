import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { LockDirective } from './lock.directive';

@Component({
  template: `
    <button dbLock>I'm hopefully locked</button>
    <button>Not me</button>
  `
})
class TestComponent {}
let debugElements: DebugElement[];
let fixture;

describe('LockDirective', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, LockDirective]
    }).createComponent(TestComponent);

    let store: any = {};
    const mockLocalStorage: any = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    localStorage.setItem('lockMode', JSON.stringify(true));

    fixture.detectChanges();
    debugElements = fixture.debugElement.queryAll(By.directive(LockDirective));
  });

  test('should have 1 lock element', () => {
    expect(debugElements.length).toBe(1);
  });

  test('should add lock class to elements if lock mode is active', () => {
    const classes = debugElements[0].nativeElement.classList;
    expect(classes).toContain('lock');
  });
});
