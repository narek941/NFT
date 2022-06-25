import React, { FC } from 'react';
import styles from './Hero.module.scss';
import { IHero } from '@type/general';

const HeroHeader: FC<IHero> = ({ header, subHeader }) => {
  return (
    <div className={styles.headerBlock}>
      <h1 className={styles.header}>{header}</h1>
      <div className={styles.headerSmall}>
        <span className={styles.decor}>{subHeader}</span>
      </div>
    </div>
  );
};

export default HeroHeader;
