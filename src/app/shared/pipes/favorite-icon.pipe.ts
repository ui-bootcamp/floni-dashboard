import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favoriteIcon'
})
export class FavoriteIconPipe implements PipeTransform {
  transform(favorite: boolean): string {
    if (favorite) {
      return 'favorite_border';
    } else {
      return 'favorite';
    }
  }
}
