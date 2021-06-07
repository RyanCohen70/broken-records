import { Nominal } from './nominal';

const enum TrackTag {}
const enum ArtistTag {}
const enum CourseTag {}
const enum ClassTag {}
const enum SchoolYearTag {}
const enum SchoolTermTag {}
const enum VenueTag {}
const enum GenreTag {}
const enum AssetTag {}

export type TTrackId = Nominal<string, TrackTag>;
export type TArtistId = Nominal<string, ArtistTag>;

export type TCourseId = Nominal<string, CourseTag>;
export type TClassId = Nominal<string, ClassTag>;

export type TSchoolYearId = Nominal<string, SchoolYearTag>;
export type TSchoolTermId = Nominal<string, SchoolTermTag>;

export type TVenueId = Nominal<string, VenueTag>;

export type TGenreId = Nominal<string, GenreTag>;

export type TAssetId = Nominal<string, AssetTag>;
export type TAssetTypeId = 'video' | 'photo' | 'poster';
