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
          <div className='music-class-section'>
            <h3>
              <span className='section-title-primary'>2019-20</span>
              <span className='section-title-secondary'>Fall</span>
            </h3>
            <div className='tracks'>
              <div className='track'>
                <div className='track-name'>Skipping Thru the Meadows</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Ironside</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Jambalaya</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Song about a Song</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
            </div>
          </div>
          <div className='music-class-section'>
            <h3>
              <span className='section-title-primary'>2018-19</span>
              <span className='section-title-secondary'>Fall</span>
            </h3>
            <div className='tracks'>
              <div className='track'>
                <div className='track-name'>Skipping Thru the Meadows</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Ironside</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Jambalaya</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Song about a Song</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
            </div>
          </div>
          <div className='music-class-section'>
            <h3>
              <span className='section-title-primary'>2016-17</span>
              <span className='section-title-secondary'>Spring</span>
            </h3>
            <div className='tracks'>
              <div className='track'>
                <div className='track-name'>Skipping Thru the Meadows</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Ironside</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Jambalaya</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
              <div className='track'>
                <div className='track-name'>Song about a Song</div>
                <div className='track-artists'>
                  Alison C, Carlos X, James Y, Wendy M
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      </div>
    </Layout>
  );
}
