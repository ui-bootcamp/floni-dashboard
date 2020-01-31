import { Track } from './track.model';

export interface AlbumWithTracks {
  id: number;
  artistId: number;
  name: string;
  cover: string;
  coverSmall: string;
  coverMedium: string;
  coverBig: string;
  coverXL: string;
  createdAt: string;
  updatedAt: string;
  tracks: Track[];
}
