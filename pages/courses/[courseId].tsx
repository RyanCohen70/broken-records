import type { GetStaticProps, GetStaticPaths } from 'next';
import type { TTrackModel, TCourseModel } from '../../lib/typedefs/models';
import type { TCourseTable } from '../../lib/typedefs/tables';

import Layout from '../../components/layout';
import { Nav, TSecondaryNavEntry } from '../../components/Nav';
import { calcPrimaryNavEntries } from '../../lib/nav';
import { TrackList } from '../../components/track';
import {
  getAllCourseIds,
  getAllCourses,
  getCourseModel,
} from '../../lib/courses';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCourseIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };

  const courseModel = await getCourseModel(params.courseId as any);
  const courses = getAllCourses();
  return {
    props: {
      courseModel,
      courses,
    },
  };
};

type TClassSectionProps = {
  readonly yearLabel: string;
  readonly termLabel: string;
  readonly tracks: TTrackModel[];
};

function ClassSection({ yearLabel, termLabel, tracks }: TClassSectionProps) {
  return (
    <div className='music-class-section'>
      <h3>
        <span className='section-title-primary'>{yearLabel}</span>
        <span className='section-title-secondary'>{termLabel}</span>
      </h3>
      <TrackList tracks={tracks} />
    </div>
  );
}

type TCourseProps = {
  readonly courseModel: TCourseModel;
  readonly courses: TCourseTable[];
};

export default function Course({ courseModel, courses }: TCourseProps) {
  function secondaryNavEntryFromCourse({
    id,
    label,
  }: TCourseTable): TSecondaryNavEntry {
    return {
      id,
      label,
      path: `/courses/${id}`,
      isSelected: courseModel.id === id,
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
          <h2>{courseModel.label}</h2>
          <p>{courseModel.description}</p>
          <div>
            {courseModel.classes.map(c => (
              <ClassSection
                key={c.id}
                yearLabel={c.yearLabel}
                termLabel={c.termLabel}
                tracks={c.tracks}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
