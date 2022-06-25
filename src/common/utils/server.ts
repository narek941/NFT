import { $apiWithToken } from '@services/index';
import { GetServerSidePropsContext } from 'next';
import { RootStore } from 'src/storage/configureStore';
import { jsonParse } from './common';

export const authorize =
  (
    cb: (ctx: GetServerSidePropsContext, store: RootStore) => Promise<any>
  ): any =>
  (store: RootStore) => {
    return async (ctx: GetServerSidePropsContext) => {
      const { req } = ctx;
      const { token } = jsonParse(req.cookies.auth) || {};
      if (token) {
        $apiWithToken.interceptors.request['handlers'] = [];
        $apiWithToken.interceptors.request.use((config) => {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
          return config;
        });
      }
      return await cb(ctx, store);
    };
  };
