import { FC } from 'react';
import { useRouter } from 'next/router';

import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { INavigationItem } from '@type/general';
import NavItemWrapper from '@components/NavItemWrapper';
import styles from './NavItem.module.scss';
import Link from 'next/link';

interface INavItem {
  item: INavigationItem;
}

export const NavItem: FC<INavItem> = ({
  item: { name, linkTo, restrictId },
}) => {
  const router = useRouter();
  const navigationConfig = useTypedSelector(
    (state) => state.configuration.navigationConfig
  );

  const isActiveItem = router.pathname === linkTo ? styles.isActive : '';

  if (restrictId && !navigationConfig[restrictId]) return null;

  return (
    <NavItemWrapper className={isActiveItem}>
      <Link href={linkTo}>
        <a className={styles.navLink}>{name}</a>
      </Link>
    </NavItemWrapper>
  );
};
