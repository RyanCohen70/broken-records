import type { GetStaticProps, GetStaticPaths } from 'next';
import type { TTrackModel, TVenueModel } from '../../lib/typedefs/models';
import type { TVenueTable } from '../../lib/typedefs/tables';

import Layout from '../../components/layout';
import { Nav, TSecondaryNavEntry } from '../../components/Nav';
import { TrackList } from '../../components/track';
import { getAllVenueIds, getAllVenues, getVenueModel } from '../../lib/venues';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllVenueIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };

  const venueModel = await getVenueModel(params.venueId as any);
  const venues = getAllVenues();
  return {
    props: {
      venueModel,
      venues,
    },
  };
};

type TClassSectionProps = {
  readonly label: string;
  readonly tracks: TTrackModel[];
};

function ClassSection({ label, tracks }: TClassSectionProps) {
  return (
    <div className='music-class-section'>
      <h3>
        <span className='section-title-primary'>{label}</span>
      </h3>
      <TrackList tracks={tracks} />
    </div>
  );
}

type TVenueProps = {
  readonly venueModel: TVenueModel;
  readonly venues: TVenueTable[];
};

export default function Venue({ venueModel, venues }: TVenueProps) {
  function secondaryNavEntryFromCourse({
    id,
    label,
  }: TVenueTable): TSecondaryNavEntry {
    return {
      id,
      label,
      path: `/venues/${id}`,
      isSelected: venueModel.id === id,
    };
  }
  return (
    <Layout>
      <div className='container'>
        <Nav
          secondaryNavEntries={venues.map(secondaryNavEntryFromCourse)}
          primarySelectedId={'venue'}
        />
        <div className='column main'>
          <h2>{venueModel.label}</h2>
          <div>
            {venueModel.classes.map(c => (
              <ClassSection key={c.id} label={c.label} tracks={c.tracks} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
