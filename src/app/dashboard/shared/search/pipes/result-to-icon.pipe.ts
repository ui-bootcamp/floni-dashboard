import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../../../media/models/artist.model';
import { Track } from '../../../media/models/track.model';
import { Article } from '../../../news/models/article.model';

@Pipe({
  name: 'resultToIcon'
})
export class ResultToIconPipe implements PipeTransform {
  public transform(value: Artist | Track | Article): string {
    if (Artist.isArtist(value)) {
      return 'face';
    } else if (Track.isTrack(value)) {
      return 'audiotrack';
    } else if (Article.isArticle(value)) {
      return 'receipt';
    }
    return '';
  }
}
