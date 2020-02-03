import { Artist } from '../../media/models/artist.model';
import { Album } from '../../media/models/album.model';
import { Track } from '../../media/models/track.model';

export class Article {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public link: string,
    public createdAt: string,
    public updatedAt: string,
    public isFavorite: boolean = false
  ) {}

  static isArticle(
    element: Artist | Album | Track | Article
  ): element is Article {
    return (element as Article).link !== undefined;
  }
}
