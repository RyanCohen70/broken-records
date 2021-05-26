export type TClassId = string;
export type TCourseId = string;

export type TClassData = {
  readonly id: TClassId;
  readonly courseId: TCourseId;
  readonly schoolTermId: string;
};
export type TCourseData = {
  readonly id: TCourseId;
  readonly name: string;
  readonly description: string;
};

export type TFullCourseData = TCourseData & {
  readonly classes: TClassData[];
};
