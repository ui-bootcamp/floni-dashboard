import { Album } from './album.model';
import { Track } from './track.model';
import { Article } from '../../news/models/article.model';

export class Artist {
  constructor(
    public id: number,
    public name: string,
    public createdAt: string,
    public updatedAt: string,
    public albums: Album[] = [],
    public isFavorite: boolean = false
  ) {}

  static isArtist(
    element: Artist | Album | Track | Article
  ): element is Artist {
    return (element as Artist).albums !== undefined;
  }
}
