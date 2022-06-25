import { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import 'src/injector/injectAll';
import { wrapper } from 'src/storage/configureStore';
import Header from '@components/header';
import Footer from '@components/footer';
import 'src/injector/injectAll';

import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { useRouter } from 'next/router';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import {
  DEFAULT_NOTIFICATION_LIMIT,
  getQueryKeys,
} from 'src/common/utils/pagination';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { isLoggedIn } from 'src/common/utils/token';
import { userInfoRequest } from '@entities/user/redux/actions';
import { ToastContainer } from 'react-toastify';

import '@styles/globalStyles.scss';
import '@styles/colors/jungle.scss';
import styles from './app.styles.module.scss';
import { parseJwt } from 'src/common/utils/jwt';
import JungleTheme from '@components/Jungle';
import classNames from 'classnames';
import { logOutFrom2FA } from '@entities/auth/redux/actions';
import { resetAuthState } from '@entities/auth/redux/slice';
import { resetUserState } from '@entities/user/redux/slice';
import { getUserNotificationsRequest } from '@entities/notification/redux/actions';
import { getNavigationConfigRequest } from '@entities/configuration/redux/actions';
import useInterval from '@hooks/useInterval';

const FORCE_LOGOUT_ROUTES = ['/email-change-confirmation'];

export const BasicLayout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filterState = useTypedSelector((state) => state.filter);
  const { user, error } = useTypedSelector((state) => state.user);
  const { token } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (FORCE_LOGOUT_ROUTES.includes(router.route)) {
      // no need to get user info if we will do force logout
      return;
    }
    if (isLoggedIn() && !user && !error) {
      dispatch(userInfoRequest({}));
    }
  }, [user, error]);

  useEffect(() => {
    dispatch(getNavigationConfigRequest(1));
  }, []);

  const {
    page,
    limit,
    collectionId,
    minPrice,
    maxPrice,
    rarities,
    traits,
    fromDate,
    toDate,
    utilities,
    mergeable,
    generative,
    status,
    dropDateFrom,
    dropDateTo,
    distributions,
    search,
    sort,
    order,
  } = filterState;

  const { isResetAction, isLoading, ...queryParams } = filterState;

  const query = {
    ...router.query,
    ...queryParams,
  };

  useInterval(() => {
    isLoggedIn() &&
      dispatch(
        getUserNotificationsRequest({
          skip: Number(0),
          take: Number(DEFAULT_NOTIFICATION_LIMIT),
          sort: String('createdAt'),
          order: String('DESC'),
        })
      );
  }, 10000);

  useNoInitialEffect(() => {
    if (token && !router.pathname.includes('signin')) {
      const jwt = parseJwt(token);
      if (user?.settings?.twoFactorAuthEnabled && !jwt.twoFactorPassed) {
        dispatch(logOutFrom2FA());
        dispatch(resetAuthState());
        dispatch(resetUserState());
      }
    }
  }, [token, router.pathname]);

  useNoInitialEffect(() => {
    if (!isResetAction) {
      if (query['tab'] === '[pid]') {
        // configure asPath of dynamic profile tabs
        query['tab'] = router.asPath.split('=')[1];
      }
      dispatch(filtersUpdate({ isLoading: true }));
      router.push({
        pathname: router.pathname,
        query: getQueryKeys(query),
      });
    }
  }, [
    page,
    limit,
    collectionId,
    minPrice,
    maxPrice,
    rarities,
    traits,
    toDate,
    fromDate,
    isResetAction,
    utilities,
    mergeable,
    generative,
    status,
    dropDateFrom,
    dropDateTo,
    distributions,
    search,
    sort,
    order,
  ]);

  const nameClass = router.pathname == '/signin' ? 'signIn' : '';
  return <div className={classNames('basicLayout', nameClass)}>{children}</div>;
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <BasicLayout>
      <JungleTheme />
      <ToastContainer />
      <Header />
      <main id='nft-main' className={styles.main}>
        <div className={styles.contentWrapper}>
          {<Component {...pageProps} />}
        </div>
      </main>
      <Footer />
    </BasicLayout>
  );
};

export default wrapper.withRedux(App);
