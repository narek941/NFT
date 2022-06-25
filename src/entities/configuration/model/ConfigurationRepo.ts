import { AxiosResponse } from 'axios';
import {
  IGetNavigationConfigPayload,
  IGetNavigationConfigResponse,
} from 'src/common/models/configuration';

export interface ConfigurationRepo {
  getNavigationConfig: (
    data: IGetNavigationConfigPayload
  ) => Promise<AxiosResponse<IGetNavigationConfigResponse, any>>;
}
