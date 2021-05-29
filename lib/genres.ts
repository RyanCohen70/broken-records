import { TGenreId } from './typedefs/ids';
import type { TGenreTable, TSchoolYearTable } from './typedefs/tables';
import type {
  TGenreModel,
  TSchoolYearSubGenreModel,
  TTrackModel,
} from './typedefs/models';
import { getAllSchoolYears } from './schoolYears';
import { getTrackModel } from './tracks';
import { loadData } from './loadData';

const genres = loadData<TGenreTable[]>('genres');

export function getAllGenreIds() {
  return genres.map((genre: TGenreTable) => {
    return {
      params: {
        genreId: genre.id,
      },
    };
  });
}

export function getAllGenres() {
  return genres.sort((a, b) => (a.id > b.id ? 1 : -1));
}

function getSchoolYearSubModel(genreId: TGenreId): TSchoolYearSubGenreModel[] {
  const schoolYearSubModel: TSchoolYearSubGenreModel[] =
    getAllSchoolYears().map((year: TSchoolYearTable) => {
      return {
        ...year,
        tracks: getTrackModel(
          'yearSubGenreModel',
          'schoolYearId',
          year.id
        ).filter((track: TTrackModel) => track.genreId === genreId),
      };
    });
  schoolYearSubModel.sort((a, b) => (a.id > b.id ? -1 : 1));
  return schoolYearSubModel;
}

export function getGenreModel(genreId: TGenreId): TGenreModel | undefined {
  const genre: TGenreTable = genres.find(
    (genre: TGenreTable) => genre.id === genreId
  )!;

  const genreModel = {
    ...genre,
    schoolYears: getSchoolYearSubModel(genreId),
  };

  return genreModel;
}
