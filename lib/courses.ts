import type { TClassData, TCourseData, TCourseFullData } from './typedefs';
import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

const coursesJsonPath = path.join(dataDirectory, 'courses.json');

const courses: TCourseData[] = JSON.parse(
  fs.readFileSync(coursesJsonPath, 'utf8')
);

const classesJsonPath = path.join(dataDirectory, 'classes.json');

const classes: TClassData[] = JSON.parse(
  fs.readFileSync(classesJsonPath, 'utf8')
);

export function getAllCourses(): TCourseData[] {
  return courses.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function getAllCourseIds() {
  return getAllCourses().map((cd: TCourseData) => {
    return {
      params: {
        courseId: cd.id,
      },
    };
  });
}

function getClassesforCourse(courseId: string): TClassData[] {
  return classes
    .filter((cld: TClassData) => cld.courseId === courseId)
    .sort((a, b) => (a.schoolTermId > b.schoolTermId ? 1 : -1));
}

export function getCourseData(courseId: string): TCourseFullData | undefined {
  const course: TCourseData = getAllCourses().find(
    (cd: TCourseData) => cd.id === courseId
  )!;
  const courseClasses: TClassData[] = getClassesforCourse(courseId);

  const fullCourseData = {
    ...course,
    classes: courseClasses,
  };
  return fullCourseData;
}
