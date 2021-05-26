import type { GetStaticProps, GetStaticPaths } from 'next';
import type { TCourseData } from '../../lib/typedefs';
import Layout from '../../components/layout';
import { Nav, TSecondaryNavEntry } from '../../components/Nav';
import { Main } from '../../components/Main';
import {
  getAllCourseIds,
  getAllCourses,
  getCourseData,
} from '../../lib/courses';
import { calcPrimaryNavEntries } from '../../lib/nav';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCourseIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };

  const courseData = await getCourseData(params.courseId as any);
  const courses = getAllCourses();
  return {
    props: {
      courseData,
      courses,
    },
  };
};

type TTrackData = {
  readonly name: string;
  readonly artistNames: string[];
};

type TTrackProps = {
  readonly track: TTrackData;
};

function Track({ track }: TTrackProps) {
  const { name, artistNames } = track;
  return (
    <div className='track'>
      <div className='track-name'>{name}</div>
      <div className='track-artists'>{artistNames.join(', ')}</div>
    </div>
  );
}

type TTrackListProps = {
  readonly tracks: TTrackData[];
};

function TrackList({ tracks }: TTrackListProps) {
  return (
    <div className='tracks'>
      {tracks.map(track => (
        <Track track={track} />
      ))}
    </div>
  );
}

type TClassSectionProps = {
  readonly year: string;
  readonly termLabel: string;
  readonly tracks: TTrackData[];
};

function ClassSection({ year, termLabel, tracks }: TClassSectionProps) {
  return (
    <div className='music-class-section'>
      <h3>
        <span className='section-title-primary'>{year}</span>
        <span className='section-title-secondary'>{termLabel}</span>
      </h3>
      <TrackList tracks={tracks} />
    </div>
  );
}

type TCourseProps = {
  readonly courseData: TCourseData;
  readonly courses: TCourseData[];
};
export default function Course({ courseData, courses }: TCourseProps) {
  function secondaryNavEntryFromCourse({
    id,
    name,
  }: TCourseData): TSecondaryNavEntry {
    return {
      id,
      label: name,
      path: `/courses/${id}`,
      isSelected: courseData.id === id,
    };
  }
  function handleClickPrimary() {
    console.log('handleClickPrimary:turkeyman is great');
  }
  return (
    <Layout>
      <div className='container'>
        <Nav
          primaryNavEntries={calcPrimaryNavEntries('class')}
          secondaryNavEntries={courses.map(secondaryNavEntryFromCourse)}
          primarySelectedId={'class'}
          onClickPrimary={handleClickPrimary}
        />
        <div className='column main'>
          <h2>{courseData.name}</h2>
          <p>{courseData.description}</p>
        </div>
        )
      </div>
    </Layout>
  );
}
