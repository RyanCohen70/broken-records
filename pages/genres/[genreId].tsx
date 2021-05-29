import type { GetStaticProps, GetStaticPaths } from 'next';
import type { TTrackModel, TGenreModel } from '../../lib/typedefs/models';
import type { TGenreTable } from '../../lib/typedefs/tables';

import Layout from '../../components/layout';
import { Nav, TSecondaryNavEntry } from '../../components/Nav';
import { TrackList } from '../../components/track';
import { getAllGenreIds, getAllGenres, getGenreModel } from '../../lib/genres';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllGenreIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };

  const genreModel = await getGenreModel(params.genreId as any);
  const genres = getAllGenres();
  return {
    props: {
      genreModel,
      genres,
    },
  };
};

type TYearSectionProps = {
  readonly yearLabel: string;
  readonly tracks: TTrackModel[];
};

function ClassSection({ yearLabel, tracks }: TYearSectionProps) {
  return (
    <div className='music-class-section'>
      <h3>
        <span className='section-title-primary'>{yearLabel}</span>
      </h3>
      <TrackList tracks={tracks} />
    </div>
  );
}

type TGenreProps = {
  readonly genreModel: TGenreModel;
  readonly genres: TGenreTable[];
};

export default function Genre({ genreModel, genres }: TGenreProps) {
  function secondaryNavEntryFromCourse({
    id,
    label,
  }: TGenreTable): TSecondaryNavEntry {
    return {
      id,
      label,
      path: `/genres/${id}`,
      isSelected: genreModel.id === id,
    };
  }
  return (
    <Layout>
      <div className='container'>
        <Nav
          secondaryNavEntries={genres.map(secondaryNavEntryFromCourse)}
          primarySelectedId={'genre'}
        />
        <div className='column main'>
          <h2>{genreModel.label}</h2>
          <div>
            {genreModel.schoolYears.map(year => (
              <ClassSection
                key={year.id}
                yearLabel={year.id}
                tracks={year.tracks}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
