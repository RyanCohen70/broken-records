import type { TTrackModel } from '../lib/typedefs/models';

type TTrackProps = {
  readonly track: TTrackModel;
};

function Track({ track }: TTrackProps) {
  const { title, artistNames } = track;
  return (
    <div className='track'>
      <div className='track-name'>{title}</div>
      <div className='track-artists'>{artistNames.join(', ')}</div>
    </div>
  );
}

type TTrackListProps = {
  readonly tracks: TTrackModel[];
};

export function TrackList({ tracks }: TTrackListProps) {
  return (
    <div className='tracks'>
      {tracks.map(track => (
        <Track track={track} />
      ))}
    </div>
  );
}
