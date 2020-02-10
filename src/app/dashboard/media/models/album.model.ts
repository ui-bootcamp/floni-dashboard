import { Track } from './track.model';
import { Artist } from './artist.model';
import { Article } from '../../news/models/article.model';
import PlaceResult = google.maps.places.PlaceResult;

export class Album {
  constructor(
    public id: number,
    public artistId: number,
    public name: string,
    public cover: string,
    public coverSmall: string,
    public coverMedium: string,
    public coverBig: string,
    public coverXL: string,
    public createdAt: string,
    public updatedAt: string,
    public tracks: Track[] = [],
    public isFavorite: boolean = false
  ) {}

  static isAlbum(
    element: Artist | Album | Track | Article | PlaceResult
  ): element is Album {
    return (element as Album).tracks !== undefined;
  }
}
