import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './TabContent.module.scss';
import { ITabContent } from '@type/general';

const TabContent: FC<ITabContent> = ({
  id,
  activeTab,
  children,
  className,
}) => {
  const tabContentClass: string = classNames(styles.tabContent, className);
  return activeTab === id ? (
    <div className={tabContentClass}>{children}</div>
  ) : null;
};

export default TabContent;
