import React from 'react';

import styles from './Sidebar.module.scss';

import { ISidebar } from '@type/general';
import classNames from 'classnames';

const Sidebar = ({ children, className }: ISidebar) => {
  const sidebarClass: string = classNames(styles.sidebar, className);
  return <div className={sidebarClass}>{children}</div>;
};

export default Sidebar;
