import type {
  TTrackTable,
  TPerformanceTable,
  TArtistTable,
} from './typedefs/tables';

//import {_} from 'lodash';
import { loadData } from './loadData';
import { TTrackModel } from './typedefs/models';

const tracks = loadData<TTrackTable[]>('tracks');
const performances = loadData<TPerformanceTable[]>('performances');
const artists = loadData<TArtistTable[]>('artists');

function getArtistsForTrack(track: TTrackTable): string[] {
  const p = performances.find(
    (p: TPerformanceTable) => p.trackTitle === track.title
  );
  if (!p) return [];

  artists.filter((a: TArtistTable) => a.id === p.artistId);
  const artistNames = artists.map(a => `${a.firstName} ${a.lastInitial}`);
  return artistNames;
}

function getLinkForTrack({ title = '', filename }: TTrackTable): string {
  const path = title
    .toLowerCase()
    .replace(/\(.+\)/, '')
    .trim()
    .replace(/ /g, '-');
  const link = `https://soundcloud.com/bush-upper-school-music/${path}`;
  return link;
}

export function getTrackModel(
  location: string,
  field: keyof TTrackTable,
  value: any
): TTrackModel[] {
  const filteredTracks: TTrackTable[] = tracks
    .filter((track: TTrackTable) => track[field] === value)
    .sort((a, b) => (a.title > b.title ? 1 : -1));
  const trackModel: TTrackModel[] = filteredTracks.map(track => ({
    ...track,
    link: getLinkForTrack(track),
    artistNames: getArtistsForTrack(track),
  }));
  //console.log(location, 'trackModel =>', trackModel);
  return trackModel;
}
