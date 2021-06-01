import type { TCourseId, TSchoolYearId } from './typedefs/ids';
import type {
  TClassTable,
  TCourseTable,
  TSchoolTermTable,
} from './typedefs/tables';
import type { TClassModel, TCourseModel } from './typedefs/models';
import { getTrackModel } from './tracks';
import { loadData } from './loadData';

const courses = loadData<TCourseTable[]>('courses');
const classes = loadData<TClassTable[]>('classes');
const schoolTerms = loadData<TSchoolTermTable[]>('school_terms');

export function getAllCourseIds() {
  return courses.map((cd: TCourseTable) => {
    return {
      params: {
        courseId: cd.id,
      },
    };
  });
}

export function getAllCourses() {
  return courses.sort((a, b) => (a.label > b.label ? 1 : -1));
}

function getClassesForCourse(courseId: TCourseId): TClassTable[] {
  return classes
    .filter((cld: TClassTable) => cld.courseId === courseId)
    .sort((a, b) => (a.schoolTermId > b.schoolTermId ? 1 : -1));
}

function getSchoolTermForClass(c: TClassTable): TSchoolTermTable | undefined {
  const schoolTerm = schoolTerms.find(
    (t: TSchoolTermTable) => t.id === c.schoolTermId
  );
  return schoolTerm;
}

function getClassModel(courseId: TCourseId): TClassModel[] {
  const classesForCourse: TClassTable[] = getClassesForCourse(courseId);
  const classModel: TClassModel[] = classesForCourse.map(c => {
    const schoolTerm = getSchoolTermForClass(c);
    const tracks = getTrackModel('classModel', 'classId', c.id);
    //onsole.log('course Tracks for', c.id, '=>', tracks);
    return {
      id: c.id,
      yearLabel: schoolTerm?.schoolYearId ?? ('' as TSchoolYearId),
      termLabel: schoolTerm?.termLabel ?? '',
      tracks: tracks,
    };
  });
  return classModel;
}

export function getCourseModel(courseId: TCourseId): TCourseModel | undefined {
  const course: TCourseTable = courses.find(
    (cd: TCourseTable) => cd.id === courseId
  )!;

  const courseModel = {
    ...course,
    classes: getClassModel(courseId),
  };

  return courseModel;
}
