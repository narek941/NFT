import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import styles from './JungleContent.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const JungleContent = () => {
  const [divHeightLarge, setDivHeightLarge] = useState<boolean>(false);
  const [divHeightMiddle, setDivHeightMiddle] = useState<boolean>(false);
  const router = useRouter();

  useLayoutEffect(() => {
    const bodyHeightLarge = document.body.clientHeight;
    if (bodyHeightLarge > 2180) {
      setDivHeightLarge(true);
    } else {
      setDivHeightLarge(false);
    }

    const bodyHeightMiddle = document.body.clientHeight;
    if (bodyHeightMiddle > 2300) {
      setDivHeightMiddle(true);
    } else {
      setDivHeightMiddle(false);
    }
  });

  const noSignIn =
    router.pathname !== '/signin' &&
    router.pathname !== '/forgot-password' &&
    router.pathname !== '/forgot-password/check-email' &&
    router.pathname !== '/signin/step1' &&
    router.pathname !== '/signin/2fa' &&
    router.pathname !== '/forgot-password/new-password' &&
    router.pathname !== '/forgot-password/success' &&
    router.pathname !== '/signup' &&
    router.pathname !== '/signup/activate';

  const isSignUp =
    router.pathname === '/signup' ||
    router.pathname === '/signup/activate' ||
    router.pathname === '/forgot-password/new-password' ||
    router.pathname === '/forgot-password/success';

  const isProfile = router.pathname === '/my-profile';

  const isBuy = router.pathname !== '/';

  const contentClassName = classNames(
    styles.content,
    noSignIn ? styles['content-main'] : styles['content-signIn'],
    divHeightLarge && styles['heihgt-large'],
    divHeightMiddle && styles['heihgt-middle'],
    isSignUp && styles['signup-bg'],
    isBuy && styles['content-buy'],
    isProfile && styles['content-profile']
  );

  return (
    <div className={contentClassName}>
      <div className={styles['leaves-left-top']}></div>
      <div className={styles['leaves-left-middle']}></div>
      <div className={styles['leaves-left-bottom']}></div>

      <div className={styles['leaves-right-top']}></div>
      <div className={styles['leaves-right-bottom']}></div>
    </div>
  );
};

export default JungleContent;
