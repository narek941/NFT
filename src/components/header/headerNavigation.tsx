import React, { useCallback } from 'react';
import Navigation from '../navigation';
import Navbar from '@components/shared/Navbar';
import { useDispatch } from 'react-redux';
import NavButton from '@shared/NavButton';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { logOut } from '@entities/auth/redux/actions';
import DropDownUser from '@components/DropDownUser';
import Avatar from '@components/shared/Avatar';
import { getMenuHeader } from 'configure';
import ButtonClose from '/public/assets/img/icon-close.svg';

import styles from './headerNavigation.module.scss';
import useHeader from './useHeader';
import classNames from 'classnames';
import { useMetamask } from '@hooks/useMetamask';
import Link from 'next/link';
import DropDownNotification from '@components/DropDownNotification';
import { toast } from 'react-toastify';

const HeaderNavigation = () => {
  const { getMetamaskAddress, metamaskAccountChange } = useMetamask();
  const { userType, twoFactorAuthEnabled, twoFactorPassed } = useTypedSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(logOut());
  };

  const getOptions = (options) =>
    options.map((item, index) => ({
      id: index,
      linkTo: item.linkTo,
      name: (
        <>
          <item.icon width='18' height='18' />
          {item.name}
        </>
      ),
      submenu: item.submenu,
      restrictId: item.restrictId,
    }));

  const _checkUserLoggedIn = () => {
    if (userType == 'authorized' && !twoFactorAuthEnabled) {
      return true;
    }
    if (twoFactorAuthEnabled && twoFactorPassed) {
      return true;
    }
    return false;
  };

  const imgSrc = '/other/user.svg';

  const user = (
    <Avatar
      userName={'User'}
      imgSrc={imgSrc}
      width={48}
      height={48}
      size='s'
      color='primary'
    />
  );

  const { ref, switchShow, show } = useHeader();

  const handleToggle = () => switchShow(!show);

  const wConnected = getMetamaskAddress() ?? false;
  const menuHeader = getMenuHeader(wConnected, (address) => {
    metamaskAccountChange(address).then((res: any) => {
      if (res.type === 'user/metaMaskSend/rejected') {
        toast.error('This metamask address is already is being used');
        return false;
      }
      toast.success(
        'Your Metamask wallet is connected. Please open the Metamask wallet extension if you want to see the details'
      );
    });
  });

  return (
    <div className={styles.container}>
      <div onClick={handleToggle}>
        <Navbar />
      </div>
      <div className={styles.login}>
        <Link href='/'>
          <a>Niftable</a>
        </Link>
      </div>
      <div
        className={classNames(
          styles['header-navigation-overlay'],
          show ? styles.isActive : ''
        )}
      ></div>
      <div
        className={classNames(
          styles['header-navigation'],
          show ? styles.isActive : ''
        )}
        ref={ref}
      >
        <div className={styles.header}>
          <button className={styles['navbar-close']} onClick={handleToggle}>
            <ButtonClose className={styles['navbar-close-icon']} />
          </button>
        </div>
        <div className={styles['navigation-wrapper']}>
          <Navigation onClickNavigation={handleToggle} />
        </div>
      </div>
      {(userType === 'prospect' ||
        userType === 'visitor' ||
        (userType === 'authorized' &&
          twoFactorAuthEnabled &&
          !twoFactorPassed)) && (
        <NavButton
          className={styles.navButton}
          size='m'
          color='blue'
          fillStyle={true}
          fullWidth={false}
          to='/signin'
        >
          Sign in
        </NavButton>
      )}

      {_checkUserLoggedIn() && (
        <div className={styles.userDropdownWrapper}>
          <DropDownNotification />
          <DropDownUser
            right={true}
            userText={user}
            showSearch={true}
            options={getOptions(menuHeader)}
            logoutHandler={logoutHandler}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderNavigation;
