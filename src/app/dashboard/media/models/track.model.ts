import { Artist } from './artist.model';
import { Album } from './album.model';
import { Article } from '../../news/models/article.model';
import PlaceResult = google.maps.places.PlaceResult;

export class Track {
  constructor(
    public id: number,
    public albumId: number,
    public artistId: number,
    public title: string,
    public duration: number,
    public createdAt: string,
    public updatedAt: string,
    public isFavorite: boolean = false
  ) {}

  static isTrack(
    element: Artist | Album | Track | Article | PlaceResult
  ): element is Track {
    return (element as Track).duration !== undefined;
  }
}
