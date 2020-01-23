import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Setting dark theme should work', done => {
    const service: ThemeService = TestBed.get(ThemeService);
    service.isDarkTheme$.subscribe((value: boolean) => {
      expect(value).toEqual(true);
      done();
    });
    service.setDarkTheme(true);
  });
});
