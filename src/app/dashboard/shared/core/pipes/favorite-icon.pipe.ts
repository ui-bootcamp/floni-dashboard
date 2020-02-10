import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favoriteIcon'
})
export class FavoriteIconPipe implements PipeTransform {
  public transform(favorite: boolean): string {
    return favorite ? 'favorite' : '';
  }
}
