import React, { FC } from 'react';
import { ISection } from '@type/general';
import styles from './Section.module.scss';
import classNames from 'classnames';

const Section: FC<ISection> = ({ children, className, color }) => {
  const getSectionClassName = (color): string => {
    const sectionClass: string = classNames(styles.section, className, {
      [styles['section-light']]: color === 'light',
    });
    return sectionClass;
  };

  const sectionClassName: string = getSectionClassName(color);
  return <section className={sectionClassName}>{children}</section>;
};

export default Section;
