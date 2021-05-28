import type { GetStaticProps, GetStaticPaths } from 'next';
import type { TTrackModel, TSchoolYearModel } from '../../lib/typedefs/models';
import type { TSchoolYearTable } from '../../lib/typedefs/tables';

import Layout from '../../components/layout';
import { Nav, TSecondaryNavEntry } from '../../components/Nav';
import { calcPrimaryNavEntries } from '../../lib/nav';
import { TrackList } from '../../components/track';
import {
  getAllSchoolYearIds,
  getAllSchoolYears,
  getSchoolYearModel,
} from '../../lib/schoolYears';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllSchoolYearIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };

  const schoolYearModel = await getSchoolYearModel(params.schoolYearId as any);
  const schoolYears = getAllSchoolYears();
  return {
    props: {
      schoolYearModel,
      schoolYears,
    },
  };
};

type TSchoolTermSectionProps = {
  readonly label: string;
  readonly tracks: TTrackModel[];
};

function SchoolTermSection({ label, tracks }: TSchoolTermSectionProps) {
  return (
    <div className='music-class-section'>
      <h3>
        <span className='section-title-primary'>{label}</span>
      </h3>
      <TrackList tracks={tracks} />
    </div>
  );
}

type TSchoolYearProps = {
  readonly schoolYearModel: TSchoolYearModel;
  readonly schoolYears: TSchoolYearTable[];
};

export default function SchoolYear({
  schoolYearModel,
  schoolYears,
}: TSchoolYearProps) {
  function secondaryNavEntryFromCourse({
    id,
  }: TSchoolYearTable): TSecondaryNavEntry {
    return {
      id,
      label: id,
      path: `/years/${id}`,
      isSelected: schoolYearModel.id === id,
    };
  }
  function handleClickPrimary() {
    console.log('handleClickPrimary:turkeyman is great');
  }
  return (
    <Layout>
      <div className='container'>
        <Nav
          primaryNavEntries={calcPrimaryNavEntries('year')}
          secondaryNavEntries={schoolYears.map(secondaryNavEntryFromCourse)}
          primarySelectedId={'year'}
          onClickPrimary={handleClickPrimary}
        />
        <div className='column main'>
          <h2>{schoolYearModel.id}</h2>
          <div>
            {schoolYearModel.terms.map(term => (
              <SchoolTermSection
                key={term.id}
                label={term.label}
                tracks={term.tracks}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
