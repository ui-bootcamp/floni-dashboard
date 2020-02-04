import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteDirective } from './directives/favorite.directive';
import { FavoriteIconPipe } from './pipes/favorite-icon.pipe';
import { LockDirective } from './directives/lock.directive';
import { LongPressDirective } from './directives/long-press.directive';

@NgModule({
  declarations: [
    FavoriteDirective,
    FavoriteIconPipe,
    LockDirective,
    LongPressDirective
  ],
  imports: [CommonModule],
  exports: [
    FavoriteIconPipe,
    FavoriteDirective,
    LockDirective,
    LongPressDirective
  ]
})
export class CoreModule {}
