export interface ILinks {
  DROP?: boolean;
  PACKS?: boolean;
  MERGES?: boolean;
  UTILITIES?: boolean;
  COLLECTIONS?: boolean;
}

export interface ConfigurationState {
  navigationConfig: ILinks;
}

export type IGetNavigationConfigPayload = number;

export interface IGetNavigationConfigResponse {
  links: ILinks;
}
