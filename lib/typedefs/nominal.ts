interface NominalTag<T> {
  'nominal type tag': T;
}
export type Nominal<Type, Tag> = NominalTag<Tag> & Type;
