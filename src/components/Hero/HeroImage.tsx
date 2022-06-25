import React from 'react';
import styles from './Hero.module.scss';
import NoImage from 'public/other/noImage.svg';

import { ExternalImage } from '@shared/ExternalImage';
import classNames from 'classnames';

const HeroImage = ({ heroImage }) => {
  return heroImage ? (
    <div className={styles.imageBox}>
      <ExternalImage
        className={styles.image}
        src={heroImage}
        alt='Hero Image'
        height='462'
        width='535'
        objectFit='contain'
        objectPosition='center center'
      />
    </div>
  ) : (
    <div className={classNames(styles.imageBox, styles['imageBox-noImage'])}>
      <NoImage className={styles['icon-svg']} />
      <div>Hero Image</div>
    </div>
  );
};

export default HeroImage;
