import React from 'react';
import { IChildren } from '@type/general';
import styles from './NavSticky.module.scss';
const NavSticky = ({ children }: IChildren) => {
  return <div className={styles.navSticky}>{children}</div>;
};

export default NavSticky;
