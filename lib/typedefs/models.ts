import {
  TTrackId,
  TArtistId,
  TCourseId,
  TClassId,
  TSchoolYearId,
  TSchoolTermId,
  TVenueId,
  TGenreId,
  TAssetId,
} from './ids';

import {
  TTrackTable,
  TArtistTable,
  TCourseTable,
  TClassTable,
  TSchoolYearTable,
  TSchoolTermTable,
  TVenueTable,
  TGenreTable,
  TAssetTable,
} from './tables';

export type TTrackModel = TTrackTable & {
  readonly link: string;
  readonly artistNames: string[];
};

export type TClassModel = {
  readonly id: TClassId;
  readonly yearLabel: TSchoolYearId;
  readonly termLabel: string;
  readonly tracks: TTrackModel[];
};

export type TCourseModel = {
  readonly id: TCourseId;
  readonly label: string;
  readonly description: string;
  readonly classes: TClassModel[];
};

export type TSchoolYearModel = {
  readonly id: TSchoolYearId;
  readonly terms: TSchoolTermModel[];
};

export type TSchoolTermModel = {
  readonly id: TSchoolTermId;
  readonly label: string;
  readonly tracks: TTrackModel[];
};

export type TVenueModel = {
  readonly id: TVenueId;
  readonly label: string;
  readonly schoolTermId: TSchoolTermId;
  readonly termYearLabel: string;
  readonly classes: TClassSubVenueModel[];
};

export type TClassSubVenueModel = {
  readonly id: TClassId;
  readonly label: string;
  readonly tracks: TTrackModel[];
};

export type TGenreModel = {
  readonly id: TGenreId;
  readonly label: string;
  readonly schoolYears: TSchoolYearSubGenreModel[];
};

export type TSchoolYearSubGenreModel = {
  readonly id: TSchoolYearId;
  readonly tracks: TTrackModel[];
};
