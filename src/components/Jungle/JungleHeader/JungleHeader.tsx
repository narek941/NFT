import React from 'react';
import { useRouter } from 'next/router';
import styles from './JungleHeader.module.scss';
import classNames from 'classnames';

const JungleHeader = () => {
  const router = useRouter();
  const noSignIn =
    router.pathname !== '/signin' &&
    router.pathname !== '/signup' &&
    router.pathname !== '/forgot-password' &&
    router.pathname !== '/forgot-password/check-email' &&
    router.pathname !== '/signin/step1' &&
    router.pathname !== '/signin/2fa' &&
    router.pathname !== '/forgot-password/new-password';

  const headerClassName = classNames(
    styles.header,
    noSignIn ? styles['header-main'] : styles['header-signIn']
  );
  return (
    <div className={headerClassName}>
      <div className={styles['leaves-center']}></div>
      <div className={styles['leaves-left']}></div>
      <div className={styles['leaves-right']}></div>
    </div>
  );
};

export default JungleHeader;
