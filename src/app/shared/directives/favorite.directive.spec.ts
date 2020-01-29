import { FavoriteDirective } from './favorite.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

@Component({
  template: `
    <h2 dbFavorite [isFavorite]="true">The favorite</h2>
    <div dbFavorite [isFavorite]="false">Another favorite</div>
    <h2>No Highlight</h2>
  `
})
class TestComponent {}
let debugElements: DebugElement[];
let fixture;

describe('FavoriteDirective', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, FavoriteDirective]
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    debugElements = fixture.debugElement.queryAll(
      By.directive(FavoriteDirective)
    );
  });

  it('should have 2 favorite elements', () => {
    expect(debugElements.length).toBe(2);
  });

  it('should add highlight-favorite to favorites ', () => {
    const classes = debugElements[0].nativeElement.classList;
    expect(classes).toContain('highlight-favorite');
  });

  it('should not add highlight-favorite to non-favorites', () => {
    const classes = debugElements[1].nativeElement.classList;
    expect(classes).not.toContain('highlight-favorite');
  });
});
