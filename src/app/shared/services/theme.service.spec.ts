import { fakeAsync, tick } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let themeService: ThemeService;

  beforeEach(() => {
    themeService = new ThemeService();
  });

  test('should emit the value which is passed to setDarkTheme', fakeAsync(() => {
    themeService.isDarkTheme$.subscribe((value: boolean) => {
      expect(value).toEqual(true);
    });
    themeService.setDarkTheme(true);
    tick();
  }));
});
