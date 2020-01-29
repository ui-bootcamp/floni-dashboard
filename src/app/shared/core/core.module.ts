import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteDirective } from '../directives/favorite.directive';
import { FavoriteIconPipe } from '../pipes/favorite-icon.pipe';

@NgModule({
  declarations: [FavoriteDirective, FavoriteIconPipe],
  imports: [CommonModule],
  exports: [FavoriteIconPipe, FavoriteDirective]
})
export class CoreModule {}
