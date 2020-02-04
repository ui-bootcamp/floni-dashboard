import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteDirective } from './directives/favorite.directive';
import { FavoriteIconPipe } from './pipes/favorite-icon.pipe';
import { LockDirective } from './directives/lock.directive';

@NgModule({
  declarations: [FavoriteDirective, FavoriteIconPipe, LockDirective],
  imports: [CommonModule],
  exports: [FavoriteIconPipe, FavoriteDirective, LockDirective]
})
export class CoreModule {}
