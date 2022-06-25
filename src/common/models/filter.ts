type NumberOrNull = number | null;
type StringOrNull = string | null;

export interface IFilterState {
  page: number;
  limit: number;
  collectionId: NumberOrNull;
  minPrice: NumberOrNull;
  maxPrice: NumberOrNull;
  rarities: StringOrNull;
  traits: StringOrNull;
  fromDate: StringOrNull;
  toDate: StringOrNull;
  utilities: StringOrNull;
  mergeable: StringOrNull;
  generative: StringOrNull;
  status: StringOrNull;
  dropDateFrom: StringOrNull;
  dropDateTo: StringOrNull;
  distributions: StringOrNull;
  isResetAction: boolean;
  isLoading: boolean;
  search: StringOrNull;
  sort: StringOrNull;
  order: StringOrNull;
  type?: StringOrNull;
}
