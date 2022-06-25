import $api from 'src/common/api';
import { AxiosResponse } from 'axios';
import { ConfigurationRepo } from '../model/ConfigurationRepo';
import {
  IGetNavigationConfigPayload,
  IGetNavigationConfigResponse,
} from 'src/common/models/configuration';

class HTTPConfigurationRepo implements ConfigurationRepo {
  getNavigationConfig: (
    data: IGetNavigationConfigPayload
  ) => Promise<AxiosResponse<IGetNavigationConfigResponse, any>> = (id) =>
    $api.get(`/white-labels/${id}/config`);
}

export default HTTPConfigurationRepo;
