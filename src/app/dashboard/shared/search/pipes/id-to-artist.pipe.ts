import { Pipe, PipeTransform } from '@angular/core';
import { MediaService } from '../../../media/shared/media.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'idToArtist'
})
export class IdToArtistPipe implements PipeTransform {
  constructor(private mediaService: MediaService) {}

  transform(artistID: number): Observable<string> {
    return this.mediaService
      .getArtist(artistID)
      .pipe(map(artist => `- ${artist.name}`));
  }
}
