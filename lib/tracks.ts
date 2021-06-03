import type {
  TTrackTable,
  TPerformanceTable,
  TStudentTable,
} from './typedefs/tables';

//import {_} from 'lodash';
import { loadData } from './loadData';
import { TTrackModel } from './typedefs/models';

const tracks = loadData<TTrackTable[]>('tracks');
const performances = loadData<TPerformanceTable[]>('performances');
const artists = loadData<TStudentTable[]>('students');

function getArtistsForTrack(track: TTrackTable): string[] {
  const p = performances.find(
    (p: TPerformanceTable) => p.trackTitle === track.title
  );
  if (!p) return [];

  artists.filter((a: TStudentTable) => a.id === p.studentId);
  const artistNames = artists.map(a => `${a.firstName} ${a.lastName}`);
  return artistNames;
}

function getLinkForTrack({ title = '' }: TTrackTable): string {
  const pathLo = title.toLowerCase();
  const pathParen = pathLo.replace(/\(.+\)/, '');
  const pathTrim = pathParen.trim();
  const pathReplace = pathTrim.replace(' ', '-');
  const path = pathReplace;
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
