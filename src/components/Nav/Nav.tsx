import React, { useState, useEffect } from 'react';

import Link from '@components/shared/Link';
import classNames from 'classnames';

import styles from './Nav.module.scss';
import { INav } from '@type/general';
import { useRouter } from 'next/router';

const Nav = ({ nav, column, gap, pills, isActiveItem, ...props }: INav) => {
  const [active, setActive] = useState<string | number>(isActiveItem);

  const getNavClassName = (
    column?: boolean,
    pills?: boolean,
    gap?: string
  ): string => {
    const btnClass: string = classNames(
      styles.nav,
      { [styles['nav-column']]: column },
      { [styles['nav-pills']]: pills },
      { [styles['gap-large']]: gap === 'l' },
      { [styles['gap-small']]: gap === 's' }
    );

    return btnClass;
  };

  const NavClassName: string = getNavClassName(column, pills, gap);
  const router = useRouter();

  return (
    <ul className={NavClassName} {...props}>
      {nav.map((navItem) => {
        const { linkTo, id, name } = navItem;
        const isActiveItem =
          (active === id && router.pathname == linkTo && styles.isActive) ||
          (active === id && styles.isActive);

        return (
          <li className={styles.navItem} key={id}>
            <Link
              href={linkTo}
              isActive={active === id}
              setActive={setActive}
              id={id}
              className={classNames([styles.navLink, isActiveItem])}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
