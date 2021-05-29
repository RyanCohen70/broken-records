import {
  TStudentId,
  TCourseId,
  TClassId,
  TSchoolYearId,
  TSchoolTermId,
  TVenueId,
  TGenreId,
  TAssetId,
} from './ids';

export type TTrackTable = {
  readonly title: string;
  readonly filename: string;
  readonly schoolYearId: TSchoolYearId;
  readonly schoolTermId: TSchoolTermId;
  readonly classId: TClassId;
  readonly genreId: TGenreId;
  readonly isMastered: boolean;
};

export type TStudentTable = {
  readonly id: TStudentId;
  readonly firstName: string;
  readonly lastName: string;
  readonly graduationYear: TSchoolYearId;
};

export type TPerformanceTable = {
  readonly studentId: TStudentId;
  readonly trackTitle: 'string';
};

export type TCourseTable = {
  readonly id: TCourseId;
  readonly label: string;
  readonly description: string;
};

export type TClassTable = {
  readonly id: TClassId;
  readonly courseId: TCourseId;
  readonly schoolTermId: TSchoolTermId;
};

export type TSchoolYearTable = {
  readonly id: TSchoolYearId;
};

export type TSchoolTermTable = {
  readonly id: TSchoolTermId;
  readonly schoolYearId: TSchoolYearId;
  readonly termLabel: string;
  readonly termIndex: number;
};

export type TVenueTable = {
  readonly id: TVenueId;
  readonly label: string;
  readonly schoolTermId: TSchoolTermId;
};

export type TGenreTable = {
  readonly id: TGenreId;
  readonly label: string;
};

export type TAssetTable = {
  readonly id: TAssetId;
  readonly filename: string;
  readonly venueId: TVenueId;
  readonly classId: TClassId;
};
