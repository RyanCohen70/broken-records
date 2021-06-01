import type { TVenueId } from './typedefs/ids';
import type { TClassTable, TVenueTable, TCourseTable } from './typedefs/tables';
import type { TVenueModel, TClassSubVenueModel } from './typedefs/models';
import { getTrackModel } from './tracks';
import { loadData } from './loadData';

const venues = loadData<TVenueTable[]>('venues');
const classes = loadData<TClassTable[]>('classes');
const courses = loadData<TCourseTable[]>('courses');

export function getAllVenueIds() {
  return venues.map((venue: TVenueTable) => {
    return {
      params: {
        venueId: venue.id,
      },
    };
  });
}

export function getAllVenues() {
  return venues.sort((a, b) => (a.id > b.id ? -1 : 1));
}

function getClassesForVenue(venueId: TVenueId): TClassTable[] {
  const venue: TVenueTable = venues.find(
    (venue: TVenueTable) => venue.id === venueId
  )!;
  return classes
    .filter((c: TClassTable) => c.schoolTermId === venue.schoolTermId)
    .sort((a, b) => (a.courseId > b.courseId ? 1 : -1));
}

function getCourseLabelForClass(c: TClassTable): string {
  const course = courses.find(
    (course: TCourseTable) => course.id === c.courseId
  );
  return course?.label!;
}

function getClassSubVenueModel(venueId: TVenueId): TClassSubVenueModel[] {
  const classesForVenue: TClassTable[] = getClassesForVenue(venueId);
  const classSubModel: TClassSubVenueModel[] = classesForVenue.map(c => {
    const courseLabel = getCourseLabelForClass(c);
    const tracks = getTrackModel('classModel', 'classId', c.id);
    //onsole.log('course Tracks for', c.id, '=>', tracks);
    return {
      id: c.id,
      label: courseLabel ?? '',
      tracks: tracks,
    };
  });
  return classSubModel;
}

export function getVenueModel(venueId: TVenueId): TVenueModel | undefined {
  const venue: TVenueTable = venues.find(
    (venue: TVenueTable) => venue.id === venueId
  )!;

  const venueModel = {
    ...venue,
    classes: getClassSubVenueModel(venueId),
  };

  return venueModel;
}
