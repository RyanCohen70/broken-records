import type {
  TTrackTable,
  TPerformanceTable,
  TStudentTable,
} from './typedefs/tables';
import { loadData } from './loadData';
import { TTrackModel } from './typedefs/models';

const tracks = loadData<TTrackTable[]>('tracks');
const performances = loadData<TPerformanceTable[]>('performances');
const artists = loadData<TStudentTable[]>('students');

function getArtistsforTracks(track: TTrackTable): string[] {
  const p = performances.find((p: TPerformanceTable) => p.trackId === track.id);
  if (!p) return [];

  artists.filter((a: TStudentTable) => a.id === p.studentId);
  const artistNames = artists.map(a => `${a.firstName} ${a.lastName}`);
  return artistNames;
}

export function getTrackModel(
  field: keyof TTrackTable,
  value: any
): TTrackModel[] {
  const filteredTracks: TTrackTable[] = tracks
    .filter((track: TTrackTable) => track[field] === value)
    .sort((a, b) => (a.id > b.id ? 1 : -1));
  return filteredTracks.map(track => ({
    ...track,
    artistNames: getArtistsforTracks(track),
  }));
}
