import {
  TArtistId,
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
  readonly schoolYearId: TSchoolYearId | undefined;
  readonly schoolTermId: TSchoolTermId | undefined;
  readonly classId: TClassId | undefined;
  readonly genreId: TGenreId;
  readonly isMastered: boolean;
};

export type TArtistTable = {
  readonly id: TArtistId;
  readonly firstName: string;
  readonly lastInitial: CharacterData;
  readonly graduationYear: TSchoolYearId;
};

export type TPerformanceTable = {
  readonly artistId: TArtistId;
  readonly trackTitle: 'string';
};

export type TClassTable = {
  readonly id: TClassId;
  readonly courseId: TCourseId;
  readonly schoolTermId: TSchoolTermId;
};

export type TCourseTable = {
  readonly id: TCourseId;
  readonly label: string;
  readonly description: string;
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
