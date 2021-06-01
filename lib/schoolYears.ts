import type { TSchoolYearId } from './typedefs/ids';
import type { TSchoolTermTable, TSchoolYearTable } from './typedefs/tables';
import type { TSchoolTermModel, TSchoolYearModel } from './typedefs/models';
import { getTrackModel } from './tracks';
import { loadData } from './loadData';

const schoolYears = loadData<TSchoolYearTable[]>('school_years');
const schoolTerms = loadData<TSchoolTermTable[]>('school_terms');

export function getAllSchoolYearIds() {
  return schoolYears.map((year: TSchoolYearTable) => {
    return {
      params: {
        schoolYearId: year.id,
      },
    };
  });
}

export function getAllSchoolYears() {
  return schoolYears.sort((a, b) => (a.id > b.id ? -1 : 1));
}

function getSchoolTermsForYear(
  schoolYearId: TSchoolYearId
): TSchoolTermTable[] {
  return schoolTerms
    .filter((term: TSchoolTermTable) => term.schoolYearId === schoolYearId)
    .sort((a, b) => (a.termIndex > b.termIndex ? 1 : -1));
}

function getSchoolTermModel(schoolYearId: TSchoolYearId): TSchoolTermModel[] {
  const schoolTermsForYear: TSchoolTermTable[] =
    getSchoolTermsForYear(schoolYearId);
  const schoolTermModel: TSchoolTermModel[] = schoolTermsForYear.map(term => {
    return {
      id: term.id,
      label: term.termLabel,
      tracks: getTrackModel('schoolTermModel', 'schoolTermId', term.id),
    };
  });
  return schoolTermModel;
}

export function getSchoolYearModel(
  schoolYearId: TSchoolYearId
): TSchoolYearModel | undefined {
  const schoolYear: TSchoolYearTable = schoolYears.find(
    (year: TSchoolYearTable) => year.id === schoolYearId
  )!;

  const schoolYearModel = {
    ...schoolYear,
    terms: getSchoolTermModel(schoolYearId),
  };

  return schoolYearModel;
}
