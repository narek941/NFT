export interface AnyProperties {
  [prop: string]: any;
}

export interface NumberProps {
  [prop: string]: number;
}

export interface Empty {
  [prop: string]: never;
}

export interface IRejectValue {
  message: string;
}

export interface ISorted {
  skip: number;
  take: number;
  sort: string;
}

export interface INFTFilters {
  collectionId?: number;
  minPrice?: number;
  maxPrice?: number;
  fromDate?: string;
  toDate?: string;
  traits?: string;
  rarities?: string;
  distribution?: string;
}
