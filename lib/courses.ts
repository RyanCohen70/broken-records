import type { TCourseData } from './typedefs';
import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

const coursesJsonPath = path.join(dataDirectory, 'courses.json');

const courses: TCourseData[] = JSON.parse(
  fs.readFileSync(coursesJsonPath, 'utf8')
);

export function getAllCourses(): TCourseData[] {
  return courses;
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

export function getCourseData(courseId: string): TFullCourseData | undefined {
  return getAllCourses().find((cd: TCourseData) => cd.id === courseId);
}
